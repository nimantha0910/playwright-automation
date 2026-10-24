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

test.describe('Login and Dashboard Navigation', () => {
  test('logs in with valid credentials', async ({ page }) => {
    await login(page, USERNAME, PASSWORD);

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByText('Dashboard')).toBeVisible();

    // Optional: Avoid using page.waitForTimeout() if possible, but keeping it since you had it
    await page.waitForTimeout(5000);
  });

  test('shows an error with invalid credentials', async ({ page }) => {
    await login(page, USERNAME, 'wrong-password');
    
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
  });



test('opens the My Tasks screen', async ({ page }) => {
  await login(page, USERNAME, PASSWORD);
  await expect(page).toHaveURL(/dashboard/);

  // Expand Tasks
  await page.getByText('Tasks', { exact: true }).click();

  // Confirm that My Tasks appears in the menu
  const myTasks = page.getByText('My Tasks', { exact: true });
  await expect(myTasks).toBeVisible();

  // Click My Tasks
  await myTasks.click();

  // Inspect the resulting page
  await page.waitForTimeout(1000);
  console.log('Current URL:', page.url());
  console.log('Page text:', (await page.locator('body').innerText()).slice(0, 3000));

  // Capture a screenshot for debugging
  await page.screenshot({ path: 'my-tasks-debug.png', fullPage: true });

  await page.waitForTimeout(10000);

  await page.getByRole('button', { name: 'Open Task' }).first().click();

  await page.waitForTimeout(10000);

  // Optional: Add an assertion to confirm the individual task view/details loaded
  //await expect(page).toHaveURL(/.*task-details/);
});


});