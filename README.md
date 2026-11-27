# بتانة (Batana) — Web Converter Frontend

Public production web interface for **Batana** Arabic PDF-to-Word conversion (`https://battana-converter.vercel.app`).

## Architecture & Security

- **Public Frontend & Gateway (`batana-website`):** Static HTML/CSS/JS + lightweight Vercel Functions (`/api/convert`, `/api/feedback`, `/api/blob-upload`, `/api/health`) that securely proxy requests to the private cloud engine using server-only environment variables (`ENGINE_API_URL`, `ENGINE_API_SECRET`).
- **Large File Support:** Files up to 20 MB are supported seamlessly via temporary private Vercel Blob storage (deleted automatically right after conversion).
- **Zero Proprietary Code in Public Repo:** All conversion logic lives strictly inside a separate private backend service.

## Environment Variables (Vercel Project Settings)

| Variable | Type | Purpose |
| --- | --- | --- |
| `ENGINE_API_URL` | Plain | Base URL of the private conversion engine service |
| `ENGINE_API_SECRET` | Secret | Shared server-to-server gateway key |
| `BLOB_READ_WRITE_TOKEN` | Secret | Auto-provisioned by private Vercel Blob store |

## Fonts

Arabic web fonts (`IBM Plex Sans Arabic`, `Amiri`, `Noto Naskh Arabic`, `Scheherazade New`) are served under the **SIL Open Font License 1.1** (see `OFL-NOTICE.md`).
