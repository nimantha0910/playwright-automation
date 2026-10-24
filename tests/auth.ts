import { Page } from '@playwright/test';

export async function login(page: Page) {
  const BASE_URL = 'https://xeynergy-qa2.360.accxis.xeybot.ai';
  const USERNAME = process.env.XEY_USERNAME!;
  const PASSWORD = process.env.PASSWORD!;

  await page.goto(BASE_URL);

  await page.getByPlaceholder('Enter your email address').fill(USERNAME);
  await page.getByPlaceholder('Enter your password').fill(PASSWORD);

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.waitForURL('**/dashboard');
}
