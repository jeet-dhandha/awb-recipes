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

## Related tools and skills

Recipes describe the *site*, so they are useful with any browser tool that can click, fill and read a page. Browser tools for agents worth knowing about (add yours with a PR; keep the description factual):

| Tool | What it is |
|---|---|
| [agent-webbridge](https://github.com/jeet-dhandha/agent-webbridge) | Drive your real, logged-in Chrome across several profiles with parallel tabs. MCP server, local only. |
| [browser-act/skills](https://github.com/browser-act/skills) | Browser automation CLI for AI agents, with human hand-off and parallel sessions. |
| [firecrawl/skills](https://github.com/firecrawl/skills) | Firecrawl skills for Claude Code, Codex and Cursor: search, scrape, crawl. |
| [frsorrentino/chrome-bridge](https://github.com/frsorrentino/chrome-bridge) | Your logged-in Chrome as an MCP server for Claude Code, with a published benchmark. |
| [dashi96/chromium-bridge](https://github.com/dashi96/chromium-bridge) | MCP bridge for Chromium browsers such as Arc and Vivaldi. |
| [eyalzh/browser-control-mcp](https://github.com/eyalzh/browser-control-mcp) | MCP server with a Firefox extension: tabs, history, page text. |
| [BrowserMCP/mcp](https://github.com/BrowserMCP/mcp) | MCP server to control your browser (not updated since April 2025). |

## Ground rules

- Only automate accounts you own and sites where automation is acceptable. Note the site's terms in `caveats` when relevant.
- No credentials, tokens, cookies or personal data in a recipe. CI rejects strings that look like secrets.
- Recipes that post, buy or delete should say so plainly in `task` and leave the final confirmation to a human.

MIT licensed.
