import { validate } from "./validate.mjs";
let f = 0;
const t = (n, c) => { console.log(`${c ? "PASS" : "FAIL"}  ${n}`); if (!c) f++; };
const good = { id: "a-b", title: "t", site: "example.com", task: "x", author: "me", status: "needs-verification", verified_on: null,
  steps: [{ action: "navigate", args: { url: "https://example.com" } }], caveats: [], tags: ["x"] };
t("valid recipe passes", validate(good, "a-b").length === 0);
t("id must match folder", validate(good, "other").length > 0);
t("unknown action rejected", validate({ ...good, steps: [{ action: "teleport" }] }, "a-b").length > 0);
t("verified needs a date", validate({ ...good, status: "verified" }, "a-b").length > 0);
t("verified with date passes", validate({ ...good, status: "verified", verified_on: "2026-10-01" }, "a-b").length === 0);
t("bad status rejected", validate({ ...good, status: "great" }, "a-b").length > 0);
t("url as site rejected", validate({ ...good, site: "https://example.com" }, "a-b").length > 0);
t("token-looking string rejected", validate({ ...good, caveats: ["ghp_" + "a".repeat(30)] }, "a-b").length > 0);
t("empty steps rejected", validate({ ...good, steps: [] }, "a-b").length > 0);
process.exit(f ? 1 : 0);
