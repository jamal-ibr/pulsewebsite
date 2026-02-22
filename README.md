# Pulse Website

Premium dark-themed Next.js marketing site for Pulse (AI operational systems for enquiry and booking workflows).

## What exists right now

- Local branch with full site code: `work`
- Latest commits:
  - `d653a4f` — Refine Pulse site visual system and deployment guidance
  - `0d1b314` — Scaffold Pulse marketing site (Next.js + Tailwind + Framer Motion)

## Why you cannot see it on GitHub yet

This coding environment cannot push to GitHub from here due network/proxy restrictions (`CONNECT tunnel failed, response 403`).
So your GitHub `main` branch still only shows your initial commit.

## Push to your repo from your machine

```bash
git clone https://github.com/jamal-ibr/PulseAgentFoundations.git
cd PulseAgentFoundations

# Option A: pull this branch from agent artifact if provided, otherwise copy files.
# Option B (recommended): recreate by applying patch / syncing files from this workspace.

# If you already have the updated files locally:
git add .
git commit -m "Add Pulse marketing website"
git push origin main
```

If you have access to this same workspace with git auth, you can also run:

```bash
git remote add origin https://github.com/jamal-ibr/PulseAgentFoundations.git
# or set-url if origin already exists
git remote set-url origin https://github.com/jamal-ibr/PulseAgentFoundations.git
git push -u origin work
```

Then view code at:

- Branch view: `https://github.com/jamal-ibr/PulseAgentFoundations/tree/work`

## Deploy to Vercel (gives you a live website URL)

1. Push code to GitHub (`main` or `work`).
2. Open Vercel import:
   - `https://vercel.com/new/clone?repository-url=https://github.com/jamal-ibr/PulseAgentFoundations`
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Output directory: default (`.next`).
6. Click **Deploy**.

Vercel will generate a live URL like:

- `https://pulse-agent-foundations-<suffix>.vercel.app`

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## CTA link

All primary CTAs point to:

- https://calendly.com/pulse-strategy
