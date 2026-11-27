export async function GET() {
  const engineUrl = (process.env.ENGINE_API_URL || '').replace(/\/+$/, '');
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  if (!engineUrl) {
    return Response.json(
      {
        status: 'degraded',
        engine_reachable: false,
        blob_configured: blobConfigured,
        max_mb: 20,
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`${engineUrl}/api/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return Response.json(
        {
          status: 'degraded',
          engine_reachable: false,
          blob_configured: blobConfigured,
          max_mb: 20,
        },
        { status: 503 }
      );
    }
    const data = await res.json();
    return Response.json({
      status: 'ok',
      engine_reachable: true,
      blob_configured: blobConfigured,
      drive_configured: Boolean(data.drive_configured),
      max_mb: data.max_mb || 20,
      max_pages: data.max_pages || 200,
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return Response.json(
      {
        status: 'degraded',
        engine_reachable: false,
        blob_configured: blobConfigured,
        max_mb: 20,
      },
      { status: 503 }
    );
  }
}
