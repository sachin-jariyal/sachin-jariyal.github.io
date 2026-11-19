# Sachin Jariyal — Portfolio

Premium React portfolio with an Apple-inspired light/dark experience.

## Stack

- React 19 + Vite
- Framer Motion
- Font Awesome icons

## Develop

```bash
npm install
npm run dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local Vite server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests |
| `npm run test:coverage` | Tests + LCOV for Sonar |
| `npm run quality` | lint + test:coverage + build |

## Quality & Sonar

CI runs on every push/PR (`.github/workflows/ci.yml`):

1. Lint
2. Unit tests with coverage
3. Production build
4. Optional **SonarCloud** job when `SONAR_TOKEN` secret is set

Sonar project file: `sonar-project.properties`

To enable SonarCloud:

1. Create/import the project on [SonarCloud](https://sonarcloud.io)
2. Add repository secret `SONAR_TOKEN`
3. Align `sonar.projectKey` in `sonar-project.properties` with your SonarCloud key

## Commit labels (bifurcation)

Use Conventional Commit prefixes so features/bugs/docs can be separated later.

See [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md).

Quick checklist when committing:

- [ ] `feat` — new feature
- [ ] `fix` — bug fix
- [ ] `docs` — docs only
- [ ] `style` — visual polish
- [ ] `refactor` — no behavior change
- [ ] `perf` — performance
- [ ] `test` — tests
- [ ] `build` — tooling/deps
- [ ] `ci` — workflows/Sonar
- [ ] `chore` — cleanup

PR template includes the same checkboxes + suggested GitHub labels (`.github/PULL_REQUEST_TEMPLATE.md`).

Label definitions: `.github/labels.yml`

## Deploy

GitHub Pages via `.github/workflows/deploy.yml`.

**Settings → Pages → Source: GitHub Actions**

## Project structure

```text
src/                 React app
public/images/       Favicon (SJ), avatar
.github/             CI, deploy, PR/issue templates
```
