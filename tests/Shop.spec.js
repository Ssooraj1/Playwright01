import { test, expect } from '@playwright/test';

test('Shop Internet tab', async ({ page, context }) => {
    await page.goto('https://fesa-www.ids.int.bell.ca');
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Internet' }).isVisible();
    await page.getByRole('button', { name: 'Internet' }).click();
    await page.getByRole('link', { name: 'Fibe Internet plans' }).isVisible();
    await page.getByRole('link', { name: 'Fibe Internet plans' }).click();
    await page.getByRole('textbox', { name: 'Address (including apartment' }).isVisible();
    await page.getByRole('textbox', { name: 'Address (including apartment' }).pressSequentially('17 rockwood scarborugh ', {delay: 100});
    await page.waitForTimeout(2000);
    const addresssugg=page.locator('.pca .pcaitem').first();
    await addresssugg.waitFor({state:'visible',timeout:3000});
    await addresssugg.click();
    await page.pause();
});
