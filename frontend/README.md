# MyPortfolio Frontend

This repository now runs as a frontend-only Next.js application. The old Django backend was removed because the current portfolio content is already defined directly in the frontend.

## Local Development

Install dependencies and start the app from this directory:

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Vercel Deployment

Deploy the `frontend` directory as the project root in Vercel.

- Framework preset: `Next.js`
- Install command: `npm install`
- Build command: `npm run build`
- Output setting: use the default Next.js output

## Notes

- All site data used by the current portfolio lives in the frontend source files.
- Project preview videos are stored under `public/videos/projects`.

## Footer Intake Setup

The contact/footer section now submits directly to a Next.js API route at `/api/contact`.

Submission flow:

- validates the request server-side
- optionally verifies Cloudflare Turnstile
- stores the message in Google Sheets
- uploads the attachment to Google Drive

### Required environment variables

Copy `.env.example` to `.env.local` for local development or set these in Vercel:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
GOOGLE_SHEETS_ID=
GOOGLE_SHEET_NAME=Submissions
GOOGLE_DRIVE_FOLDER_ID=
```

### Google setup

1. Create a Google Cloud project.
2. Enable `Google Sheets API` and `Google Drive API`.
3. Create a service account.
4. Generate a JSON key for that service account.
5. Share your target Google Sheet with the service account email as `Editor`.
6. Share your target Google Drive folder with the service account email as `Editor`.
7. Put the service account email into `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
8. Put the private key into `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`.
   Replace real newlines with `\n` when storing it in Vercel.
9. Put the spreadsheet ID into `GOOGLE_SHEETS_ID`.
10. Put the Drive folder ID into `GOOGLE_DRIVE_FOLDER_ID`.

### Suggested Google Sheet columns

Create a sheet tab named `Submissions` with this header row:

```text
timestamp | name | email | subject | timeline | message | attachment_name | attachment_url | ip_address | status
```

### Turnstile setup

Turnstile is optional locally, but recommended in production.

1. Create a Cloudflare Turnstile widget.
2. Add your production domain and `localhost`.
3. Use the site key in `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
4. Use the secret key in `TURNSTILE_SECRET_KEY`.

### Attachment policy

- allowed: PDF, DOCX, TXT, PNG, JPG, JPEG, WEBP
- max size: 5 MB

### Spam protection currently included

- hidden honeypot field
- best-effort in-memory rate limit in the API route
- server-side validation
- optional Turnstile verification

For stronger production rate limiting across multiple Vercel instances, add a shared store such as Vercel KV later.
