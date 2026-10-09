# awb-recipes

Community-maintained **recipes for automating logged-in websites** with [agent-webbridge](https://github.com/jeet-dhandha/agent-webbridge), which lets Claude Code, Cursor and other MCP clients drive your real Chrome.

Websites change their markup all the time. A recipe records *how to do one task on one site* (which actions to call, which selectors still work, which traps to avoid) and carries a date saying when someone last confirmed it. When a site changes, one small pull request fixes it for everyone.

## Use a recipe

Browse [`recipes/`](recipes/). Each folder has a `recipe.json`:

| Field | Meaning |
|---|---|
| `status` | `verified` (confirmed on the date shown), `needs-verification` (written from experience, not re-tested recently) or `broken` |
| `steps` | agent-webbridge actions in order, with notes on why |
| `caveats` | the traps: hashed class names, rate limits, CAPTCHAs, terms of service |

Hand a recipe to your agent: *"Do the `github-gist-create` recipe from awb-recipes with my Work profile."* Site-agnostic lessons live in [`patterns/`](patterns/).

## Contribute (about 15 minutes)

You do **not** need to write a new recipe. The easiest useful pull request is to **verify one**:

1. Pick a `needs-verification` recipe for a site you use.
2. Run its steps with agent-webbridge on your own account.
3. If it works, set `status` to `verified`, `verified_on` to today, and open a PR.
4. If a step fails, fix the selector, then open a PR describing what changed on the page.

CI validates the format on every PR, so no maintainer needs to hand-check structure. See [CONTRIBUTING.md](CONTRIBUTING.md). Open [issues labelled `good first recipe`](../../issues?q=label%3A%22good+first+recipe%22) to claim one.

## Ground rules

- Only automate accounts you own and sites where automation is acceptable. Note the site's terms in `caveats` when relevant.
- No credentials, tokens, cookies or personal data in a recipe. CI rejects strings that look like secrets.
- Recipes that post, buy or delete should say so plainly in `task` and leave the final confirmation to a human.

MIT licensed.
