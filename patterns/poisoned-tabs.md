# Some URLs permanently poison a tab

**Symptom:** after navigating a tab to `chromewebstore.google.com`, `chrome.google.com/webstore`, `chrome://*` or `addons.mozilla.org`, every later `navigate` or `evaluate` on that tab fails with *"The extensions gallery cannot be scripted."* The tab never recovers.

**Fix**
1. Filter those URLs out of any worklist before navigating (many "Visit website" links on Product Hunt point at extension stores).
2. Record the URL and skip text extraction.
3. If a tab is already poisoned, `close_session`, then `navigate` with `newTab: true`.

*Status: observed by the author while scraping about 1,000 pages.*
