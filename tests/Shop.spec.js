import { test, expect } from '@playwright/test';
import { createContextWithExtension, getPage } from './helpers/browser-context.js';

test('Shop Internet tab', async ({ }, testInfo) => {
  const { browser, context } = await createContextWithExtension(testInfo.workerIndex, testInfo);
  const page = await getPage(context);

  try {
    await page.goto('https://fesa-www.ids.int.bell.ca');   
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Accept all cookies' }).click();
    await page.getByRole('button', { name: 'Internet' }).isVisible();
    await page.getByRole('button', { name: 'Internet' }).click();
    await page.getByRole('link', { name: 'Fibe Internet plans' }).isVisible();
    await page.getByRole('link', { name: 'Fibe Internet plans' }).click();
    await page.getByRole('textbox', { name: 'Address (including apartment' }).isVisible();
    await page.getByRole('textbox', { name: 'Address (including apartment' }).pressSequentially('17 rockwood scarborugh ', {delay: 50});
    await page.waitForTimeout(2000);
    const addresssugg = page.locator('.pca .pcaitem').first();
    await addresssugg.waitFor({ state: 'visible', timeout: 3000 });
    await addresssugg.click();
    await page.getByRole('link', { name: 'View plans' }).click();
    // await page.waitForTimeout(10000);
    await page.getByRole('radio').first().isVisible();
    // await expect(page).toHaveTitle(/Your Bundle/);
  } finally {
    await browser.close();
  }
});
