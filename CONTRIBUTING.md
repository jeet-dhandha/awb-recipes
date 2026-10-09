# Contributing

## Verify or fix an existing recipe (best first PR)

1. Install [agent-webbridge](https://github.com/jeet-dhandha/agent-webbridge) and bring up a Chrome profile that is signed in to the site.
2. Follow the recipe's `steps`. Use `snapshot` to see the real page.
3. Edit `recipes/<id>/recipe.json`:
   - worked as written: `"status": "verified"`, `"verified_on": "YYYY-MM-DD"`
   - needed a change: fix the step, add what you learned to `caveats`, then verify as above
   - impossible now: `"status": "broken"` and say why in `caveats`
4. `npm test`, then open a PR. One recipe per PR is ideal.

## Add a new recipe

Copy a folder under `recipes/`. The folder name is the `id` (kebab-case). Required fields are checked by `scripts/validate.mjs`: `id`, `title`, `site` (bare host), `task`, `status`, `steps`, `caveats`, `tags`, `author`. Only claim `verified` if you actually ran it; otherwise use `needs-verification`.

## What makes a good recipe

- Prefer `data-testid`, ARIA roles and visible text over class names. Hashed classes break on every deploy.
- Say what the recipe will *not* do, and when to stop (CAPTCHAs, login walls).
- Keep it to one task. Link `patterns/` instead of repeating general advice.
- Never include secrets, cookies or other people's personal data.

## Add a pattern

Site-agnostic lessons go in `patterns/` as short markdown files: the symptom, the fix, and how you know.
