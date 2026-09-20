# Blockfuse Labs | Website V1

The official website for **Blockfuse Labs** — training production-ready engineers
and building dependable AI, web, and blockchain systems from Jos, Nigeria.

## About the website

This site is home to Blockfuse Labs:

- **Academy** — AI-native software engineering, applied AI, blockchain, and team
  training programmes with the hiring pipeline attached.
- **Engineering** — hire Blockfuse engineers, engage embedded engineers, sponsor
  a cohort, or train your team.
- **Community** — events, meetups, workshops, hackathons, and demo days.
- **Blog** — stories, ideas, and updates from Blockfuse.
- **Alumni** — graduates from Cohorts I and II, assessed and on record.
- **About & Contact** — our story, impact, and how to reach us.

It includes a fully API-driven **admin dashboard** (`/admin`) used by the team to
publish content (blogs, events) and review everything submitted through the site
— contacts, applications, hiring requests, newsletter sign-ups, ProdFest
registrations, sponsorships, open-source applications, and alumni profiles.

## Purpose

Blockfuse Labs develops production-ready engineers for the AI-native world and
builds dependable software. The website is how people find our programmes, apply,
attend our events, and get in touch.

## Tech stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS
- **Backend:** Express (Node.js), Sequelize, MySQL / PostgreSQL
- **Deployment:** Render (via `render.yaml` in the repo root)

## Repository structure

```
├── backend/      REST API (Express, Sequelize)
├── frontend/     Website + admin dashboard (Next.js)
└── render.yaml   Deploys the backend and frontend to Render
```

See `README` sections under `frontend/` and `backend/` for detailed development
setup and API documentation.