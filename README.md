# TeachAbroad Hub MVP

TeachAbroad Hub is a Next.js + TypeScript + Supabase prototype for ESL, TEFL, and teaching-abroad hiring. The MVP includes a polished split landing page, Supabase Auth scaffolding, route protection, job browsing and application flows, recruiter pipeline controls, whitelisted chat, organisation dashboards, resources visibility, and a future-proof Postgres schema.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, Storage
- Supabase Row Level Security policies

## Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code. It is only used by `supabase/seed.ts`.

## Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Database setup

Run the migration in `supabase/migrations/0001_initial_schema.sql` with Supabase CLI or the SQL editor. It creates:

- Auth-linked `profiles`
- Candidate and recruiter profiles
- Organisations and memberships
- Jobs and applications with status history
- Conversations and messages
- Candidate documents and document sharing
- Reviews, ranking metrics and sponsored placements
- Resources/wiki visibility rules
- Activity logs, job views and search logs
- Subscription plans, organisation subscriptions and payments
- Notifications
- Helper functions, indexes, uniqueness constraints and RLS policies

The schema also includes `update_application_status(...)`, which preserves application history, logs recruiter activity, blocks `hired` before whitelist, and opens chat when a candidate is whitelisted.

## Seed data

After the migration:

```bash
npm run seed
```

Seeded accounts use password `Password123!`:

- `ana@teachabroad.test` candidate
- `sam@teachabroad.test` candidate
- `lee@teachabroad.test` candidate
- `recruiter@teachabroad.test` agency recruiter
- `school@teachabroad.test` school recruiter
- `agency@teachabroad.test` agency owner
- `owner-school@teachabroad.test` school owner

Seed data includes Global Teach Recruitment, Chengdu Bright Future Kindergarten, four live China jobs, sample applications across the full pipeline, candidate resources, and a labelled sponsored featured job.

## Main flows to test

1. Visit `/` for the split recruiter/candidate landing page.
2. Sign up or log in at `/auth/signup` or `/auth/login`.
3. Edit candidate profile at `/candidate/profile` and reach 80% completion.
4. Browse `/jobs` and open `/jobs/[slug]`.
5. Apply only when the candidate profile is complete enough.
6. Recruiters view `/recruiter/jobs` and `/recruiter/jobs/[id]/applicants`.
7. Use pipeline controls to reject, whitelist, request interview, offer, or hire.
8. Whitelisting opens a conversation automatically.
9. Open `/messages/[conversationId]` to send a basic message.
10. Agency and school dashboards show aggregate hiring metrics.
11. `/resources` hides candidate-only resources from recruiters/public visitors.

## Notes for future work

- Replace MVP placeholders with full forms for job creation, organisation settings, invitations and billing.
- Generate Supabase TypeScript types from the deployed database once the project is linked.
- Tighten RLS for document visibility before production; the schema already supports granular sharing.
- Keep sponsored placements separate from organic rankings and always label sponsored UI.
- TeachAbroad Hub is a workflow platform, not the employer or hiring decision maker.
