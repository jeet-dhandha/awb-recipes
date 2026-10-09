# A fast-failing worker drains a shared queue

If several workers pull from one shared work index and one worker's tab is broken, it errors in milliseconds and grabs nearly every remaining item, failing them all instantly.

**Rule:** on any `navigate` or `evaluate` exception, reset that worker's tab (`close_session`, then a fresh `navigate` with `newTab: true`) before it takes the next item. Write results to disk after every item so a run can resume.
