![logrono](logrono.png)

*Blessed are you, pilgrim, because you have discovered that the true path begins
when it ends -- The Pilgrim Beatitudes*

## Summary

A simple npm project to test e2e UI using playwright. The test results
will be in Allure format.

### Local setup

- Run the following

```console
npm install
npx playwright install-deps
```
- Then install the browsers

```console
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

- Run the tests in headless mode

```console
npm run test
```

- View results in Allure

```console
npm run allure
```
