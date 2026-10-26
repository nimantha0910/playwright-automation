import { test, expect } from '@playwright/test';
import { login } from './auth.setup'; 

test.describe('Organization Navigation Workflow', () => {

  test('should navigate to Organization and open the company', async ({ page }) => {
    // 1. Log in using the imported helper function
    await login(page);

    
    await page.getByText('Organization', { exact: true }).click();

    
    const companySubMenu = page.getByText('Company', { exact: true });
    await expect(companySubMenu).toBeVisible();
    await companySubMenu.click();

    const companydetailsSubMenu = page.getByText('Company Details', { exact: true });
    await expect(companydetailsSubMenu).toBeVisible();
    await companydetailsSubMenu.click();


    
    await expect(page.getByRole('heading', { name: 'Company Details' })).toBeVisible();

    await page.waitForTimeout(5000);
  });

});