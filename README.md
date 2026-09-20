# Blockfuse Labs — Website V1

Monorepo for the Blockfuse Labs marketing site and its backend API.

```
└── backend/      Express + Sequelize REST API (Node.js)
└── frontend/     Next.js 16 marketing site + admin dashboard
└── render.yaml   Render Blueprint — deploys both services
```

## Repository layout

| Path        | Stack                          | Port | Notes                                        |
| ----------- | ------------------------------ | ---- | -------------------------------------------- |
| `backend/`  | Express 5, Sequelize, MySQL/PG | 5000 | REST API, JWT auth, rate-limited submissions  |
| `frontend/` | Next.js 16, React 19, Tailwind | 3000 | Marketing site, forms, admin dashboard (pnpm) |

The website is fully API-driven: public pages and the `/admin` dashboard read and
write through the backend API from `frontend/src/lib/`.

## Backend

### Requirements

- Node.js 18+
- A database:
  - **Development** — MySQL (see `DEV_DB_*` vars)
  - **Production** — PostgreSQL via `DATABASE_URL`

### Setup & run

```bash
cd backend
cp .env.example .env    # fill in your values
npm install
npm run migrate         # run Sequelize migrations
npm run seed            # optional: seed the initial admin user
npm run dev             # nodemon, port 5000
```

### Environment variables

| Variable               | Required | Description                              |
| ---------------------- | -------- | ---------------------------------------- |
| `PORT`                 | no       | HTTP port (default `5000`)               |
| `NODE_ENV`             | no       | `development` / `production`             |
| `DATABASE_URL`         | prod     | PostgreSQL URL (production)              |
| `DEV_DB_*`             | dev      | MySQL connection (development)           |
| `JWT_SECRET`           | yes      | Signs admin auth tokens                  |
| `FRONTEND_URL`         | prod     | Allowed CORS origin                      |
| `CLOUDINARY_*`         | optional | File uploads (resumes, photos)           |
| `RESEND_API_KEY`       | optional | Email notifications                      |
| `ADMIN_EMAIL`          | no       | Where notifications are sent             |

### Scripts

- `npm start` — run in production
- `npm run migrate` / `npm run migrate:undo` — Sequelize migrations
- `npm run seed` — seed data

### Admin auth

- `POST /api/auth/login` with `{ email, password }` returns a JWT (24h).
- Protected endpoints require `Authorization: Bearer <token>`.

## Frontend

### Requirements

- Node.js 18+, `pnpm` (a `pnpm-lock.yaml` ships with the repo)

### Setup & run

```bash
cd frontend
cp .env.example .env.local   # defaults to the deployed API already
pnpm install
pnpm dev                     # port 3000
```

### Environment variables

| Variable               | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_API_URL`  | Backend base URL; defaults to the deployed API   |

### Scripts

- `pnpm dev` — local dev server
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm exec tsc --noEmit` — type check (note: `next lint` is unavailable in Next 16)

### API client

All API integration lives in `frontend/src/lib/`:

- `api.ts` — fetch helpers that unwrap the backend `{ success, data }` envelope
- `token.ts` — admin session storage (localStorage)
- `*.ts` (blogs, events, contact, applications, hire, newsletter, prodfest,
  sponsor, opensource, alumni, auth) — typed endpoints per resource

### Admin dashboard

The CMS lives at `/admin`:

- `/admin/login` — sign in with admin credentials
- Manage **Blogs** (`/admin/blogs`) and **Events** (`/admin/events`)
- Review inbound submissions: **Contacts, Applications, Hiring, Newsletter,
  ProdFest, Sponsorships, Open Source, Alumni**

## Deployment

Both services deploy on Render from this repo via `render.yaml`
(a Blueprint — create from it in the Render dashboard).

- **Backend** — root dir `backend/`, health check `GET /api/health`
- **Frontend** — root dir `frontend/`, `NEXT_PUBLIC_API_URL` must point at the
  backend host

The following env vars are not committed (`sync: false` in `render.yaml`); set
them in the Render dashboard **Environment** tab:

- backend: `DATABASE_URL`, `ADMIN_PASSWORD`, `FRONTEND_URL`,
  `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`,
  `RESEND_API_KEY`
- frontend: `NEXT_PUBLIC_API_URL`

After merging to `main`, push to trigger an automatic redeploy.

## API reference

See `API.md` / `API.pdf` in the repo root for the full endpoint reference
(routes, payloads, auth, and rate limits).