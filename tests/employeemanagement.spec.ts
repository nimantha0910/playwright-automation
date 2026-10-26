import { test, expect } from '@playwright/test';
import { login } from './auth.setup'; 

test.describe('Emp Management Navigation Workflow', () => {

  test('should navigate to Emp Management and open the All employees', async ({ page }) => {
    // 1. Log in using the imported helper function
    await login(page);

    // 2. Find "Employee Management" in the sidebar, scroll to it, and click it ONCE
    const targetItem = page.getByText('Employee Management', { exact: true });
    await targetItem.scrollIntoViewIfNeeded();
    await targetItem.click();

    // 3. Wait for the sub-menu (e.g., 'Company') to appear and click it
    const allEmployeesSubMenu = page.getByText('Company', { exact: true });
    await expect(allEmployeesSubMenu).toBeVisible();
    await allEmployeesSubMenu.click();

    // 4. Verify that the "All Employees" screen heading loaded successfully
    await expect(page.getByRole('heading', { name: 'All Employees' })).toBeVisible();

    // 5. Optional pause to view the screen
    await page.waitForTimeout(5000);
  });

});