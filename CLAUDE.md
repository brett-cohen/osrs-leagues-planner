# OSRS Leagues Planner

A static web app for planning Old School RuneScape leagues content.

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
