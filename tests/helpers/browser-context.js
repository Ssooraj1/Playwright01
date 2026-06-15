import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates a persistent browser context with the custom extension loaded
 * @returns {Promise<BrowserContext>} Browser context with extension
 */
export async function createContextWithExtension() {
  const userDataDir = path.join(__dirname, '../../test-user-data');
  const extensionPath = path.join(__dirname, '../../extensions/2026_customextensionV5');
  
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--disable-blink-features=AutomationControlled',
    ],
    // Optional: Use installed Chrome instead of Chromium
    // channel: 'chrome',
  });
  
  return context;
}

/**
 * Gets or creates a page from the context
 * @param {BrowserContext} context - The browser context
 * @returns {Promise<Page>} The page object
 */
export async function getPage(context) {
  return context.pages()[0] || await context.newPage();
}
