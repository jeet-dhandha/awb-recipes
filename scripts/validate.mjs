// validate.mjs — zero-dependency recipe linter. Run: node scripts/validate.mjs [dir]
// Exits non-zero if any recipe is malformed, so CI can gate contributions without a maintainer.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "recipes");
const STATUSES = ["verified", "needs-verification", "broken"];
const ACTIONS = ["navigate", "find_tab", "snapshot", "click", "trusted_click", "fill", "evaluate", "screenshot",
  "upload", "network", "save_as_pdf", "list_tabs", "close_tab", "close_session"];
const SECRET = /(ghp_[A-Za-z0-9]{20,}|npm_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;

export function validate(r, dirName) {
  const e = [];
  const need = (k, t) => { if (typeof r[k] !== t) e.push(`"${k}" must be a ${t}`); };
  need("id", "string"); need("title", "string"); need("site", "string"); need("task", "string"); need("author", "string");
  if (r.id && r.id !== dirName) e.push(`id "${r.id}" must equal its folder name "${dirName}"`);
  if (r.id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.id)) e.push("id must be kebab-case");
  if (r.site && !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(r.site)) e.push('site must be a bare host like "github.com"');
  if (!STATUSES.includes(r.status)) e.push(`status must be one of ${STATUSES.join(", ")}`);
  if (r.status === "verified" && !/^\d{4}-\d{2}-\d{2}$/.test(r.verified_on || "")) e.push('a "verified" recipe needs verified_on: YYYY-MM-DD');
  if (r.status !== "verified" && r.verified_on != null && !/^\d{4}-\d{2}-\d{2}$/.test(r.verified_on)) e.push("verified_on must be YYYY-MM-DD or null");
  if (!Array.isArray(r.steps) || r.steps.length === 0) e.push("steps must be a non-empty array");
  else r.steps.forEach((s, i) => {
    if (!ACTIONS.includes(s.action)) e.push(`steps[${i}].action "${s.action}" is not an agent-webbridge action`);
    if (s.args != null && typeof s.args !== "object") e.push(`steps[${i}].args must be an object`);
  });
  if (!Array.isArray(r.caveats)) e.push("caveats must be an array (use [] if none)");
  if (!Array.isArray(r.tags) || r.tags.length === 0) e.push("tags must be a non-empty array");
  if (SECRET.test(JSON.stringify(r))) e.push("looks like it contains a secret or token. Remove it");
  return e;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let bad = 0, n = 0;
  for (const d of fs.readdirSync(ROOT, { withFileTypes: true }).filter((x) => x.isDirectory())) {
    const f = path.join(ROOT, d.name, "recipe.json");
    n++;
    let r;
    try { r = JSON.parse(fs.readFileSync(f, "utf8")); } catch (err) { console.log(`FAIL ${d.name}: ${err.message}`); bad++; continue; }
    const errs = validate(r, d.name);
    if (errs.length) { bad++; console.log(`FAIL ${d.name}\n  - ${errs.join("\n  - ")}`); } else console.log(`ok   ${d.name} (${r.status})`);
  }
  console.log(`\n${n - bad}/${n} recipes valid`);
  process.exit(bad ? 1 : 0);
}
