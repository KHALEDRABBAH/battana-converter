import { handleUpload } from '@vercel/blob/client';
import { metric } from '@vercel/functions';

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20 MB

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'طلب غير صالح.' }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!pathname || !pathname.toLowerCase().endsWith('.pdf')) {
          throw new Error('يُسمح برفع ملفات PDF فقط.');
        }
        let parsed = {};
        try {
          parsed = clientPayload ? JSON.parse(clientPayload) : {};
        } catch {
          parsed = {};
        }
        if (!parsed.consent) {
          throw new Error('يرجى الموافقة على شروط تحسين المحرك أولاً.');
        }

        return {
          allowedContentTypes: ['application/pdf', 'application/octet-stream'],
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            consent: true,
            mode: String(parsed.mode || 'auto'),
          }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        metric('batana.blob.uploaded', 1, { outcome: 'success' });
        console.info('Temporary PDF uploaded to private blob:', blob.pathname);
      },
    });

    return Response.json(jsonResponse);
  } catch (error) {
    metric('batana.blob.uploaded', 1, { outcome: 'error' });
    console.error('Blob upload token error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'تعذّر تجهيز رفع الملف.' },
      { status: 400 }
    );
  }
}
