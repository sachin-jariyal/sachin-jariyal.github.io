# Commit convention (for bifurcation)

Use [Conventional Commits](https://www.conventionalcommits.org/) so history can be filtered by type:

```text
<type>(optional-scope): <short summary>

[optional body]
```

## Types / labels

| Prefix   | Label      | Use for |
|----------|------------|---------|
| `feat:`  | `feat`     | New user-facing feature |
| `fix:`   | `fix`      | Bug fix |
| `docs:`  | `docs`     | README, templates, comments |
| `style:` | `style`    | UI polish / CSS (no logic) |
| `refactor:` | `refactor` | Internal restructure |
| `perf:`  | `perf`     | Performance |
| `test:`  | `test`     | Tests only |
| `build:` | `build`    | Vite, npm deps |
| `ci:`    | `ci`       | GitHub Actions / Sonar |
| `chore:` | `chore`    | Cleanup, tooling misc |

## Examples

```bash
git commit -m "feat(hero): move role under signature"
git commit -m "fix(cursor): use white arrow in dark mode"
git commit -m "test: cover theme toggle and content invariants"
git commit -m "chore: remove legacy css/js assets"
```

## Filtering later

```bash
git log --oneline --grep="^feat"
git log --oneline --grep="^fix"
```

On GitHub, filter PRs/issues by the same labels.
