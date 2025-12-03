![logrono](logrono.png)

*Blessed are you, pilgrim, because you have discovered that the true path begins
when it ends -- The Pilgrim Beatitudes*

## Summary

A simple npm project to test e2e UI using playwright. The test results
will be in Allure format.

### Local setup

- Install Bun https://bun.com

- Run the following

```console
bun install
bunx playwright install-deps
```
- Then install the browsers

```console
bunx playwright install chromium
bunx playwright install firefox
bunx playwright install webkit
```

- Run the tests in headless mode

```console
bun run test
```

- View results in Allure

```console
bun run allure
```
