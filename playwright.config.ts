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
  use: {
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
