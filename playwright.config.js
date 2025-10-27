// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { loadEnvConfig } = require('./utils/data');

//const ENV = process.env.ENV || 'qa'; // qa | staging | prod
//const envCfg = loadEnvConfig(ENV);

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
//    baseURL: envCfg.baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // storageState: 'storage/auth.json', // uncomment if you create a saved login
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
//    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
//    { name: 'webkit',   use: { ...devices['Desktop Safari'] } }
  ]
});
