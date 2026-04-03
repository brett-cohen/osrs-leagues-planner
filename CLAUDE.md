# OSRS Leagues Planner

A static web app for planning Old School RuneScape (OSRS) Leagues runs.

## Domain: OSRS Leagues

Leagues is a temporary OSRS game mode built around decision-making, tradeoffs, and route planning.

### Tasks
- Players complete tasks ranging in difficulty: Easy, Medium, Hard, Elite, Master
- Each task awards a set number of points
- Tasks are the primary driver of progression — completing them unlocks regions and earns points for relics

### Regions
- Players start with 1 region unlocked, plus 1 forced unlock (e.g. Tutorial Island / starter area)
- Completing enough tasks allows unlocking up to 3 additional regions (4 total)
- Region choice is a major strategic decision — it determines what content is accessible

### Relics
- Points accumulated from tasks are spent to unlock relic tiers
- There are 8 tiers of relics
- Each tier presents 2–3 options; players pick exactly one
- Relics provide powerful, game-changing passive effects
- Relic choices are permanent and have cascading effects on what tasks/content are viable

### Planning Problem
The core of the app: players want to plan which regions to unlock and which relics to choose *before* committing in-game, since choices are hard or impossible to reverse. A good planner helps reason about task point totals, region synergies, and relic combos.

## Tech Stack

- **React 18** with TypeScript (strict mode)
- **Vite 5** for bundling and dev server
- **GitHub Pages** for hosting (deployed via GitHub Actions on push to `main`)

## Commands

```bash
npm run dev      # start local dev server (http://localhost:5173)
npm run build    # type-check + build to dist/
npm run lint     # run ESLint
npm run preview  # preview the production build locally
```

## Key Config

- `vite.config.ts` — `base` is set to `/osrs-leagues-planner/` for GitHub Pages subpath routing
- `tsconfig.app.json` — strict TypeScript with `noUnusedLocals`, `noUnusedParameters`
- `.github/workflows/deploy.yml` — builds on every push to `main`, deploys via `actions/deploy-pages`

## Deployment

Pushes to `main` automatically trigger the GitHub Actions workflow. The site deploys to:
`https://<username>.github.io/osrs-leagues-planner/`

GitHub Pages source must be set to **GitHub Actions** in repo settings (Settings → Pages → Source).

## Project Structure

```
src/
  App.tsx         # root component
  main.tsx        # entry point
  index.css       # global styles
  App.css         # app-level styles
  assets/         # static assets imported by components
public/           # assets served as-is (not processed by Vite)
```
