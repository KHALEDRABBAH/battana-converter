import { del } from '@vercel/blob';
import { metric, waitUntil } from '@vercel/functions';

const BLOB_HOST_RE = /^https:\/\/[a-z0-9.-]+\.(?:public\.)?blob\.vercel-storage\.com\//i;

const FORWARDED_HEADERS = [
  'content-type',
  'content-disposition',
  'content-length',
  'x-batana-job-id',
  'x-batana-pages',
  'x-batana-duration-ms',
  'x-batana-mode',
  'x-batana-drive-archived',
  'x-batana-output-name',
];

export async function POST(request) {
  const startedAt = performance.now();
  const engineUrl = (process.env.ENGINE_API_URL || '').replace(/\/+$/, '');
  const engineSecret = (process.env.ENGINE_API_SECRET || '').trim();

  if (!engineUrl || !engineSecret) {
    console.error('Missing ENGINE_API_URL or ENGINE_API_SECRET env vars');
    return Response.json(
      { detail: 'خدمة التحويل غير مهيّأة حالياً. يرجى المحاولة بعد قليل.' },
      { status: 503 }
    );
  }

  const contentType = request.headers.get('content-type') || '';
  let blobUrlToDelete = null;
  let outcome = 'error';
  let modeTag = 'auto';

  try {
    let upstream;

    if (contentType.toLowerCase().includes('application/json')) {
      let body;
      try {
        body = await request.json();
      } catch {
        return Response.json({ detail: 'صيغة الطلب غير صالحة.' }, { status: 400 });
      }

      const blobUrl = String(body.blob_url || '').trim();
      if (!BLOB_HOST_RE.test(blobUrl)) {
        return Response.json({ detail: 'رابط الملف المؤقت غير صالح.' }, { status: 400 });
      }
      blobUrlToDelete = blobUrl;
      modeTag = String(body.mode || 'auto');

      upstream = await fetch(`${engineUrl}/api/convert`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-engine-secret': engineSecret,
        },
        body: JSON.stringify({
          blob_url: blobUrl,
          blob_token: process.env.BLOB_READ_WRITE_TOKEN || '',
          filename: String(body.filename || 'document.pdf'),
          mode: modeTag,
          consent: Boolean(body.consent),
        }),
        signal: AbortSignal.timeout(285000),
      });
    } else if (contentType.toLowerCase().includes('multipart/form-data')) {
      const rawBody = await request.arrayBuffer();
      upstream = await fetch(`${engineUrl}/api/convert`, {
        method: 'POST',
        headers: {
          'content-type': contentType,
          'x-engine-secret': engineSecret,
        },
        body: rawBody,
        signal: AbortSignal.timeout(285000),
      });
    } else {
      return Response.json({ detail: 'نوع الطلب غير مدعوم.' }, { status: 415 });
    }

    if (blobUrlToDelete) {
      const urlToClean = blobUrlToDelete;
      blobUrlToDelete = null;
      waitUntil(
        del(urlToClean).catch((err) => {
          console.error('Failed to delete temporary blob:', err);
        })
      );
    }

    if (!upstream.ok) {
      let errText = 'تعذّر تحويل الملف. يرجى التحقق من الملف وإعادة المحاولة.';
      try {
        const errJson = await upstream.json();
        if (errJson && typeof errJson.detail === 'string') {
          errText = errJson.detail;
        }
      } catch {
        // Keep friendly fallback error
      }
      return Response.json({ detail: errText }, { status: upstream.status });
    }

    const outHeaders = new Headers();
    for (const key of FORWARDED_HEADERS) {
      const val = upstream.headers.get(key);
      if (val !== null) {
        outHeaders.set(key, val);
      }
    }
    outHeaders.set('cache-control', 'no-store');
    modeTag = upstream.headers.get('x-batana-mode') || modeTag;
    outcome = 'success';

    return new Response(upstream.body, {
      status: 200,
      headers: outHeaders,
    });
  } catch (error) {
    console.error('Gateway convert error:', error);
    if (blobUrlToDelete) {
      const urlToClean = blobUrlToDelete;
      waitUntil(
        del(urlToClean).catch((err) => {
          console.error('Failed to delete temporary blob after error:', err);
        })
      );
    }
    return Response.json(
      { detail: 'حدث تأخير أو خطأ في الاتصال بمحرك التحويل. يرجى المحاولة مجدداً.' },
      { status: 502 }
    );
  } finally {
    const durationMs = Math.round(performance.now() - startedAt);
    metric('batana.convert.requests', 1, { outcome, mode: modeTag });
    metric('batana.convert.duration_ms', durationMs, { outcome, mode: modeTag });
  }
}
