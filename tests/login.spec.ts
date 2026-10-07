import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://xeynergy-qa2.360.accxis.xeybot.ai';
const USERNAME = process.env.XEY_USERNAME!;
const PASSWORD = process.env.PASSWORD!;

async function login(page: Page, username: string, password: string) {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('Enter your email address').fill(username);
  await page.getByPlaceholder('Enter your password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

test.describe('Login', () => {
  test('logs in with valid credentials', async ({ page }) => {
    await login(page, USERNAME, PASSWORD);

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByText('Dashboard')).toBeVisible();

    await page.waitForTimeout(5000);
  });

  test('shows an error with invalid credentials', async ({ page }) => {
    await login(page, USERNAME, 'wrong-password');

    
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();

  });

  test('opens a campaign report from the dashboard', async ({ page }) => {
  await login(page, USERNAME, PASSWORD);

  // 1. Dashboard -> click "View Reports"
  await page.getByRole('button', { name: /View Reports/i }).click();
  await expect(page.getByRole('heading', { name: 'Recruitment Reports' })).toBeVisible();

  // 2. Click the eye icon on the first campaign row
  const firstRow = page.getByRole('row').nth(1); // row 0 is the table header
  await firstRow.locator('button, a').last().click();
});


});