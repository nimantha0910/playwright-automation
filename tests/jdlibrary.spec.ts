import { test, expect } from '@playwright/test';
import { login } from './auth.setup'; 

test.describe('JD Library Navigation Workflow', () => {

  test('should navigate to JD Library and open the Job Descriptions', async ({ page }) => {
    // 1. Log in using the imported helper function
    await login(page);

    
    await page.getByText('JD Library', { exact: true }).click();

    
    const jobDescriptionSubMenu = page.getByText('Job Descriptions', { exact: true });
    await expect(jobDescriptionSubMenu).toBeVisible();
    await jobDescriptionSubMenu.click();


    await expect(page.getByRole('heading', { name: 'Job Descriptions' })).toBeVisible();

    await page.waitForTimeout(5000);
  });

});