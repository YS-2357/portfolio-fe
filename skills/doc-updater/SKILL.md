---
name: doc-updater
description: "Update project docs in reference/ and skills/ to reflect current code/structure. Use when routes, content paths, deployment settings, or AI agent rules change."
---

# Doc Updater

## Overview
Keep AI agent docs aligned with the actual repo structure and workflows.

## Workflow
1. Identify the code or content change (routes, content paths, deploy config, assets).
2. Update matching docs in `reference/` using `references/doc-map.md`.
3. If a skill changes, update its `skills/<name>/SKILL.md`.
4. Note new paths in `reference/domain/content-schema.md` when applicable.

## References
- `references/doc-map.md`
