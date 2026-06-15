import { test, expect } from '@playwright/test';

test('Shop Internet tab', async ({ page, context }) => {
    // Check if extension is loaded
    console.log('🔍 Checking for loaded extensions...');
    const extensions = await context.backgroundPages();
    console.log(`📦 Number of extensions loaded: ${extensions.length}`);
    
    if (extensions.length > 0) {
        console.log('✅ Extension is loaded!');
        extensions.forEach((ext, index) => {
            console.log(`   Extension ${index + 1} URL: ${ext.url()}`);
        });
    } else {
        console.log('❌ No extensions detected');
    }

    await page.goto('https://fesa-www.ids.int.bell.ca');
    
    // Check if content script injected any markers
    const hasExtensionMarker = await page.evaluate(() => {
        return window.hasOwnProperty('extensionLoaded') || 
               document.documentElement.hasAttribute('data-extension-loaded');
    });
    console.log(`🎯 Content script marker detected: ${hasExtensionMarker}`);
    
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
});
