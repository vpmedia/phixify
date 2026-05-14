# AGENTS.md

## Overview

Command-line asset and manifest generator for the Phaser and Pixi.js game engines. Converts WAV → MP3/OGG, PNG → AVIF/WEBP, resizes images to multiple resolutions, builds audio sprites and sprite sheets, and emits Pixi.js asset bundle and Phaser resource pack JSON manifests. Relies on system tools (`sox`, `texture-packer`, optionally `imagemagick` and `ffmpeg`).

## Tech Stack

- **Language:** TypeScript (ESM, `"type": "module"`)
- **Runtime:** Node.js (CLI)
- **Package Manager:** pnpm (workspaces)
- **Runtime Dependencies:** `commander` (CLI), `sharp` (image processing)
- **Build:** Rolldown
- **Distribution:** Docker (Dockerfile), bin entry `phixify`
- **Testing:** Vitest, @vitest/coverage-v8, happy-dom
- **Lint/Format:** oxlint (+ `oxlint-tsgolint`), oxfmt
- **Type Checking:** TypeScript
- **Tooling:** lefthook (git hooks), commitlint (conventional commits)

## Documentation

- Commander: https://context7.com/tj/commander.js/llms.txt
- Lefthook: https://lefthook.dev/llms.txt
- OXC (oxlint, oxfmt): https://oxc.rs/llms.txt
- Rolldown: https://rolldown.rs/llms.txt
- Sharp: https://context7.com/lovell/sharp/llms.txt
- TypeScript: https://context7.com/websites/typescriptlang/llms.txt
- Vitest: https://vitest.dev/llms.txt

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

- **Commits:** Conventional Commits (`@commitlint/config-conventional`)
- **Modules:** ESM only
- **Style:** Enforced by oxlint + oxfmt — do not hand-format

## Testing

- Tests are co-located with source as `*.test.ts` under `src/phixify/`
- Run a single file: `pnpm test src/phixify/tool/fileUtil.test.ts`
