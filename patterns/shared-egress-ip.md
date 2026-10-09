# All profiles share one outbound IP

Running many profiles and tabs in parallel is fast, but every request leaves from the same IP address. Fanning out is great across many different sites and risky against a single one. For one rate-limited site, lower concurrency and add cooldowns. If you see a CAPTCHA, stop and resume later.
