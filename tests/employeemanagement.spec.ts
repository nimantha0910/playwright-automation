import { test, expect } from '@playwright/test';
import { login } from './auth';

test('Navigate to Employe Management -> All Employees', async ({ page }) => {

  // Click Employee Management
  await page.getByText('Employee Management', { exact: true }).click();

  // Click All Employees
  await page.getByText('All Employees', { exact: true }).click();

  // Verify navigation to the All Employees page
  await expect(
    page.getByText('All Employees', { exact: true })
  ).toBeVisible();
});