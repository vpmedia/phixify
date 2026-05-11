# AGENTS.md

## Overview

Command-line asset and manifest generator for the Phaser and Pixi.js game engines. Converts WAV → MP3/OGG, PNG → AVIF/WEBP, resizes images to multiple resolutions, builds audio sprites and sprite sheets, and emits Pixi.js asset bundle and Phaser resource pack JSON manifests. Relies on system tools (`sox`, `texture-packer`, optionally `imagemagick` and `ffmpeg`).

## Tech Stack

- **Language:** TypeScript (ESM, `"type": "module"`)
- **Runtime:** Node.js (CLI)
- **Package Manager:** pnpm (workspaces)
- **Domain:** CLI asset & manifest generator for Phaser and Pixi.js game engines
- **Runtime Dependencies:** `commander` (CLI), `sharp` (image processing)
- **Build:** Rolldown
- **Distribution:** Docker (Dockerfile), bin entry `phixify`
- **Testing:** Vitest, @vitest/coverage-v8, jsdom
- **Lint/Format:** oxlint (+ `oxlint-tsgolint`), oxfmt
- **Type Checking:** TypeScript
- **Tooling:** lefthook (git hooks), commitlint (conventional commits)

## Commands

- **Install:** `pnpm install`
- **Build:** `pnpm build` (clears `dist/` + `lib/`, runs Rolldown)
- **Test:** `pnpm test`
- **Lint / Format / Typecheck:** `pnpm lint` / `pnpm format` / `pnpm typecheck`
- **All checks:** `pnpm check`
- **Run CLI locally:** `./phixify.sh` (or `node dist/phixify.js` after build)
- **Docker:** `./docker-run.sh`

## Project Structure

- `src/index.ts` — CLI entry point
- `src/phixify/` — implementation modules (incl. `tool/`)
- `asset/` — sample/test assets
- `dist/` — build output (CLI bin output, gitignored)
- `Dockerfile`, `docker-run.sh`, `phixify.sh` — packaging/run scripts

## Conventions

- **Commits:** Conventional Commits with custom rules (header ≤ 100, body line ≤ 100, no sentence/start/pascal/upper-case subjects)
- **Modules:** ESM only
- **Style:** Enforced by oxlint + oxfmt

## Testing

- Tests are co-located with source as `*.test.ts` under `src/phixify/`
- Run a single file: `pnpm test src/phixify/tool/fileUtil.test.ts`
