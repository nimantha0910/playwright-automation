import { test, expect } from '@playwright/test';
import { login } from './auth.setup'; // Imports login from your auth file

test.describe('Task Navigation Workflow', () => {

  test('should navigate to My Tasks and open the first task card', async ({ page }) => {
    // 1. Log in using the imported helper function
    await login(page);

    // 2. Click the parent "Tasks" menu in the sidebar to expand it
    await page.getByText('Tasks', { exact: true }).click();

    // 3. Wait for "My Tasks" to appear and click it
    const myTasksSubMenu = page.getByText('My Tasks', { exact: true });
    await expect(myTasksSubMenu).toBeVisible();
    await myTasksSubMenu.click();

    // 4. Verify that the My Tasks screen has loaded
    await expect(page.getByRole('heading', { name: 'My Tasks' })).toBeVisible();

    // 5. Click the "Open Task" button of the very first card
    await page.getByRole('button', { name: 'Open Task' }).first().click();

    await page.waitForTimeout(5000);
  });

});