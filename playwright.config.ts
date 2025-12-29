import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 10000,
  reporter: [
    ['list'],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
      },
    ],
  ],
  // Multi-browser testing
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  use: {
    // Use data-test attribute when using page.getByTestId(testId).
    testIdAttribute: 'data-test',
    baseURL: 'https://www.saucedemo.com',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Disable password manager to avoid popups
    launchOptions: {
      args: [
        '--disable-features=PasswordManager',
        '--disable-password-manager-reauthentication',
      ],
    },
  },
});
