// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { loadEnvConfig } = require('./utils/data');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
//    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } }
//    { name: 'Microsoft Edge', use: { channel: 'msedge', ...devices['Desktop Edge'] } }
  ]
});
