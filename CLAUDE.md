# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Garden Skills is a curated, open-source collection of production-ready **Agent Skills** for AI coding agents (Claude Code, Cursor, Codex, Gemini CLI, OpenCode). Each skill is a self-contained folder with a `SKILL.md` (agent-facing instructions), `manifest.json` (machine-readable metadata), and optional `references/`, `scripts/`, `templates/`, `themes/`.

The repo also contains user-authored `articles/` which are **workspace content** using garden skills — not part of the skill distribution.

## Common commands

```bash
node --version          # must be >= 20 (no npm install needed — zero deps)
npm run list            # list all skills + manifest status
npm run validate        # CI checks: manifests, smoke-pack, README sync (exit 1 on issues)
npm run readme:sync     # rewrite README download links to match manifest versions
npm run readme:check    # exit 1 if any download link is stale
npm run pack:all        # pack all skills into dist/release/

npm run release         # interactive release flow (the main one)
npm run release:dry     # preview without writing
npm run release -- --yes  # skip confirmation prompt
npm run release -- --skill <name> --bump patch|minor|major
```

## Architecture

### Skill structure

Every skill follows a standard layout:

```
skills/<name>/
├── SKILL.md            # YAML frontmatter + agent instructions (the contract)
├── manifest.json       # name / version / category / description / compat
├── README.md           # English docs (rendered on GitHub)
├── README.zh-CN.md     # Chinese docs
├── references/         # docs the agent loads on-demand
├── scripts/            # deterministic executable helpers
└── templates/themes/   # scaffold/asset resources
```

The `name` in `manifest.json` **must match** the folder name and `SKILL.md` frontmatter `name`. The `manifest.json` is a separate machine-readable contract (JSON, not YAML) so release tooling doesn't need a YAML parser.

Skills are versioned **independently** with SemVer — each has its own release tags and cadence.

### The 4 garden skills

- **web-video-presentation** (v1.2.1) — Turns articles/scripts into click-driven 16:9 web presentations (Vite + React + TS). 4-phase workflow: content → web dev → optional audio → recording. Has `scaffold.sh`, 23 built-in themes, TTS providers.
- **web-design-engineer** (v1.2.1) — Builds polished visual web artifacts (landing pages, dashboards, slide decks, animations, data visualizations). 6-step design workflow with style recipe references.
- **gpt-image-2** (v1.0.3) — Image generation/editing via GPT Image 2 and OpenAI-compatible APIs. 18 visual categories, 80+ prompt templates.
- **kb-retriever** (v1.0.0) — Local knowledge-base retriever with progressive search, PDF/Excel support.

There are also 8 small **GSAP sub-skills** (`gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-react`, `gsap-performance`, `gsap-frameworks`) with an index at `skills/llms.txt`. These have `SKILL.md` only (no README/manifest) and are not in the release pipeline.

### Release tooling

Zero-dependency Node.js ESM scripts in `scripts/release/`:

- `cut-release.mjs` — interactive release helper (scan skills, prompt bump, tag, push)
- `pack-skill.mjs` — bundle a skill into `<name>-<version>.zip` + `.sha256`
- `update-readme.mjs` — rewrite inline `<!-- DOWNLOAD:... -->` markers in READMEs
- `list-skills.mjs` — inspect manifests and folder structure
- `lib/skills.mjs` — shared helpers

Release flow: `npm run release` → bumps manifest → commits + tags → pushes atomically → CI (`release-skill.yml`) builds zips, creates GitHub Releases, re-syncs README download links back to main.

Tags use the format `<skill-name>-v<semver>` (e.g., `web-video-presentation-v1.2.1`).

### CI

Two GitHub Actions workflows:
- `validate-skills.yml` — runs on every PR/push touching skills or release scripts. Runs `npm run validate`.
- `release-skill.yml` — tag-driven per-skill release. Parses tag, packs skill, creates GitHub Release with zip+sha256, commits README sync back to main.

### articles/ directory

`articles/` is user workspace content, **not part of skill distribution**. The `web-video-presentation` skill operates here: an article (`article.md`) → script + outline → scaffolded `presentation/` (Vite + React + TS). The presentation project under `articles/<topic>/<article>/presentation/` is a complete standalone Vite app with chapters in `src/chapters/<NN>-id/`, each containing `<Chapter>.tsx`, `<Chapter>.css`, and `narrations.ts`.

### .agents/ and .claude/ directories

`.agents/skills/` contains 15 third-party skills installed from `heygen-com/hyperframes` via `npx skills add`. `.claude/skills/` symlinks to them for Claude Code discovery. These are tracked in `skills-lock.json`.

## Adding a new skill

1. Create `skills/<name>/` with `SKILL.md` + `manifest.json` (start at `0.1.0` or `1.0.0`)
2. Add the DOWNLOAD marker placeholder to all localized READMEs
3. Run `npm run readme:sync` → `npm run validate`
4. Open a PR; CI validates
5. After merge, `npm run release` to cut the first release

## Key constraints

- No `npm install` — release tooling is zero-dependency ESM, CI has no install step
- Per-skill independent versioning, not repo-wide
- Each skill has both `manifest.json` (for tooling) and `SKILL.md` (for agents) — they serve different consumers
- The `articles/` directory is gitignored in parts (scaffold output) but the source `.md` files are tracked
