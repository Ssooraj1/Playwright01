import { test, expect } from '@playwright/test';
import { createContextWithExtension, getPage } from './helpers/browser-context.js';
import testData from '././testdata/aga-flows-data.json';

test('AGA Device', async ({ }, testInfo) => {
    const { browser, context } = await createContextWithExtension(testInfo.workerIndex, testInfo);
    const page = await getPage(context);
    const data = testData['AGA_Device'];
    try {
        // await page.goto('https://fesa-www.ids.int.bell.ca');
        await page.goto(data.url);
        await page.pause();

    }
    finally {
        await browser.close();
    }
});

test('AGA esim', async ({ }, testInfo) => {
    const { browser, context } = await createContextWithExtension(testInfo.workerIndex);
    const page = await getPage(context);
    try {

    }
    finally {
        await browser.close();
    }
});

test('AGA psim', async ({ }, testInfo) => {
    const { browser, context } = await createContextWithExtension(testInfo.workerIndex);
    const page = await getPage(context);
    try {

    }
    finally {
        await browser.close();
    }
});
