---
name: Do not deploy without explicit permission
description: Never run deploy commands unless the user explicitly says to deploy
type: feedback
---

Do not deploy unless the user explicitly says so.

**Why:** User wants full control over when changes go live to production (GitHub Pages).

**How to apply:** Never run `npm run deploy` or push to production branches proactively. Wait for explicit "deploy" instruction.
