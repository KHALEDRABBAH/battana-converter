import { metric } from '@vercel/functions';

export async function POST(request) {
  const engineUrl = (process.env.ENGINE_API_URL || '').replace(/\/+$/, '');
  const engineSecret = (process.env.ENGINE_API_SECRET || '').trim();

  if (!engineUrl || !engineSecret) {
    console.error('Missing ENGINE_API_URL or ENGINE_API_SECRET for feedback');
    return Response.json({ detail: 'خدمة التقييم غير مهيّأة حالياً.' }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ detail: 'صيغة التقييم غير صالحة.' }, { status: 400 });
  }

  const rating = Number(body.rating);
  const jobId = String(body.job_id || '').trim();
  if (!jobId || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return Response.json({ detail: 'يرجى اختيار تقييم صحيح من 1 إلى 5 نجوم.' }, { status: 400 });
  }

  let outcome = 'error';
  try {
    const upstream = await fetch(`${engineUrl}/api/feedback`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-engine-secret': engineSecret,
      },
      body: JSON.stringify({
        job_id: jobId,
        rating,
        categories: Array.isArray(body.categories) ? body.categories.slice(0, 8) : [],
        comment: String(body.comment || '').slice(0, 2000),
        filename: String(body.filename || '').slice(0, 160),
        mode: String(body.mode || 'auto').slice(0, 32),
        pages: Number.isFinite(Number(body.pages)) ? Math.max(0, Math.round(Number(body.pages))) : 0,
      }),
      signal: AbortSignal.timeout(20000),
    });

    const data = await upstream.json().catch(() => ({ ok: upstream.ok }));
    if (!upstream.ok) {
      return Response.json(
        { detail: data.detail || 'تعذّر حفظ التقييم حالياً.' },
        { status: upstream.status }
      );
    }

    outcome = 'success';
    return Response.json({
      ok: true,
      job_id: jobId,
      rating,
      saved_to_drive: Boolean(data.saved_to_drive),
    });
  } catch (error) {
    console.error('Gateway feedback error:', error);
    return Response.json(
      { detail: 'حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.' },
      { status: 502 }
    );
  } finally {
    metric('batana.feedback.submitted', 1, {
      outcome,
      rating_bucket: rating === 5 ? '5_stars' : 'under_5',
    });
  }
}
