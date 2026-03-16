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
