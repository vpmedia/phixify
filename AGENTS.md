# AGENTS.md

## Overview

Command-line asset and manifest generator for the Phaser and Pixi.js game engines. Converts WAV → MP3/OGG, PNG → AVIF/WEBP, resizes images to multiple resolutions, builds audio sprites and sprite sheets, and emits Pixi.js asset bundle and Phaser resource pack JSON manifests. Relies on system tools (`sox`, `texture-packer`, optionally `imagemagick` and `ffmpeg`).

## Tech Stack

Read [package.json](package.json) for the language, runtime, dependencies and tooling.

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

## Conventions

- **Commits:** Conventional Commits (`@commitlint/config-conventional`)
- **Modules:** ESM only
- **Style:** Enforced by oxlint + oxfmt — do not hand-format

## Testing

- Tests are co-located with source as `*.test.ts` under `src/phixify/`
- Run a single file: `pnpm test src/phixify/tool/fileUtil.test.ts`
