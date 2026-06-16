import { test, expect } from '@playwright/test';
import { createContextWithExtension, getPage } from './helpers/browser-context.js';

test('mybell login', async ({ page }) => {
    const context = await createContextWithExtension();
    const page = await getPage(context);

    await page.goto('https://fesa-mybell.ids.int.bell.ca');
    await page.getByRole('textbox', { name: 'Username or email address' }).fill('502043425_RGU');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('502043425_RGU');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(5000);
    await context.close();
    // await page.pause();
});