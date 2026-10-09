# `navigate` blocks until `load`. Poll instead.

`navigate` waits for the page `load` event, which takes 10 to 35 seconds on heavy sites and gets worse under concurrency. The element you want usually appears in 1 to 2 seconds.

**Pattern:** call `navigate`, then poll `evaluate` for the element or text you need, with a timeout, and move on as soon as it exists.

*Status: observed by the author.*
