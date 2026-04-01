# Restored Claude Code Source

![Preview](preview.png)

This repository is a restored Claude Code source tree reconstructed primarily from source maps and missing-module backfilling.

It is not the original upstream repository state. Some files were unrecoverable from source maps and have been replaced with compatibility shims or degraded implementations so the
project can install and run again.

TODO: Some files still require decoding of their source mapping information.

## Current status

- The source tree is restorable and runnable in a local development workflow.
- `bun install` succeeds.
- `bun run version` succeeds.
- `bun run dev` now routes through the restored CLI bootstrap instead of the temporary `dev-entry` shim.
- `bun run dev --help` shows the full command tree from the restored CLI.
- A number of modules still contain restoration-time fallbacks, so behavior may differ from the original Claude Code implementation.

## Restored so far

Recent restoration work has recovered several pieces beyond the initial source-map import:

- the default Bun scripts now start the real CLI bootstrap path
- bundled skill content for `claude-api` and `verify` has been rewritten from placeholder files into usable reference docs
- compatibility layers for Chrome MCP and Computer Use MCP now expose realistic tool catalogs and structured degraded-mode responses instead of empty stubs
- several explicit placeholder resources have been replaced with working fallback prompts for planning and permission-classifier flows

Remaining gaps are mostly private/native integrations where the original implementation was not recoverable from source maps, so those areas still rely on shims or reduced behavior.

## Why this exists

Source maps do not contain a full original repository:

- type-only files are often missing
- build-time generated files may be absent
- private package wrappers and native bindings may not be recoverable
- dynamic imports and resource files are frequently incomplete

This repository fills those gaps enough to produce a usable, runnable restored workspace.

## Run

Requirements:

- Bun 1.3.5 or newer
- Node.js 24 or newer

Install dependencies:

```bash
bun install
```

Run the restored CLI:

```bash
bun run dev
```

Print the restored version:

```bash
bun run version
```

## Restoration Notes

# Restored Claude Code Source

![Preview](preview.png)

This repository is a Claude Code source tree reconstructed primarily from source maps, then filled in with missing modules.

It is not the upstream repository's original state. Some files cannot be recovered from source maps alone, so it still includes compatibility shims or degraded implementations to keep the project installable and runnable.

### Current Status

- This source tree can now be restored and run in a local dev workflow.
- `bun install` runs successfully.
- `bun run version` runs successfully.
- `bun run dev` now boots via the restored real CLI bootstrap, not the temporary `dev-entry`.
- `bun run dev --help` shows the restored full command tree.
- Some modules still keep restoration-time fallbacks, so behavior may differ from the original Claude Code.

### Restored Content

The most recent restoration pass backfilled several key parts beyond the initial source-map import:

- The default Bun scripts now go through the real CLI bootstrap path.
- The bundled skill content for `claude-api` and `verify` has been restored from placeholder files to usable reference docs.
- The Chrome MCP and Computer Use MCP compatibility layers now expose a tool directory closer to the real one and return structured degraded responses instead of empty stubs.
- Some explicit placeholder resources have been replaced with usable planning and permission-classifier fallback prompts.

Remaining gaps are mostly in private or native integrations. Those implementations cannot be fully recovered from source maps alone, so these areas still rely on shims or degraded behavior.

### Why This Repo Exists

Source maps themselves cannot contain the complete original repository:

- Type-specific files are often missing.
- Build-time generated files may not exist.
- Private package wrappers and native bindings may not be recoverable.
- Dynamic imports and resource files are often incomplete.

The goal of this repository is to fill these gaps to a "usable, runnable" level, forming a restoration workspace that can continue to be repaired.

### How To Run

Environment requirements:

- Bun 1.3.5 or newer
- Node.js 24 or newer

Install dependencies:

```bash
bun install
```

Run the restored CLI:

```bash
bun run dev
```

Print the restored version:

```bash
bun run version
```
