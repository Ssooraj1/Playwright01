import { test, expect } from '@playwright/test';
test('mybell login', async ({ page }) => {
    await page.goto('https://fesa-mybell.ids.int.bell.ca');
    // await page.pause();
    await page.getByRole('textbox', { name: 'Username or email address' }).fill('502043425_RGU');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('502043425_RGU');
    await page.getByRole('button', { name: 'Log in' }).click();
    // await page.pause();
});