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

## Styling

The app is themed after the OSRS in-game UI: dark/black backgrounds, yellow primary text, brown panels with beveled borders, retro pixel font. No rounded corners anywhere.

**Component library:** Mantine v7 (`@mantine/core`, `@mantine/hooks`). Always forced to dark mode via `forceColorScheme="dark"` on `MantineProvider`.

**Theme:** `src/theme.ts` — all design tokens are defined here via Mantine's `createTheme()`:
- `primaryColor: 'osrsYellow'` — `#ffff00` at shade 5
- `osrsGold` — `#ff981f` at shade 5, used for secondary/links
- `osrsBrown` — 10-shade panel palette; shades 4/8 are the bevel border hi/lo values
- `defaultRadius: 0` + all radius scale entries set to `'0'` — no rounded corners anywhere
- `fontFamily`: `'Press Start 2P'` loaded from Google Fonts in `index.html`

**Global CSS** (`src/index.css`) handles only things Mantine can't:
- `body` background + disable font smoothing for crisp pixel rendering
- `img { image-rendering: pixelated }` for sprites and icons
- `.panel` / `.panel-inset` — characteristic OSRS raised/sunken bevel using `--mantine-color-osrsBrown-{4,8}` CSS vars
- `.divider` — double-line bevel rule

**Rules:**
- Never use `border-radius` — OSRS has sharp corners everywhere
- Use Mantine's `c` prop (e.g. `c="osrsGold.5"`) for text colors rather than inline styles
- Use `.panel` / `.panel-inset` CSS classes for the bevel panel effect
- Use `image-rendering: pixelated` on all icons and sprites

**Font note:** For the authentic RuneScape bitmap font (Plain 11/12), download from https://github.com/RuneStar/fonts (CC0), place TTF in `public/fonts/`, and add an `@font-face` rule in `index.css`.

## Tech Stack

- **React 18** with TypeScript (strict mode)
- **Vite 5** for bundling and dev server
- **Mantine v7** component library (forced dark mode)
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
  theme.ts        # Mantine theme (all design tokens)
  main.tsx        # entry point — MantineProvider lives here
  App.tsx         # root component
  App.css         # app-level layout styles
  index.css       # global overrides (bevel panels, image rendering, font smoothing)
  assets/         # static assets imported by components
public/           # assets served as-is (not processed by Vite)
```
