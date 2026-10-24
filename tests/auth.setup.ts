import { Page, expect } from '@playwright/test';

const BASE_URL = 'https://xeynergy-qa2.360.accxis.xeybot.ai';
const USERNAME = process.env.XEY_USERNAME!;
const PASSWORD = process.env.PASSWORD!;

/**
 * Reusable login helper function
 */
export async function login(page: Page) {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('Enter your email address').fill(USERNAME);
  await page.getByPlaceholder('Enter your password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  // Verify login was successful
  await expect(page).toHaveURL(/dashboard/);
}