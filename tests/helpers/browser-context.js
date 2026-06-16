import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates browser context with extension functionality for parallel execution
 * Respects headless setting from playwright.config.js
 * @param {number} workerIndex - Playwright worker index for parallel isolation
 * @returns {Promise<{browser: Browser, context: BrowserContext}>}
 */
export async function createContextWithExtension(workerIndex = 0) {
  const extensionPath = path.join(__dirname, '../../extensions/2026_customextensionV5');
  
  // Blocked URLs from extension
  const blockedUrls = [
    '*://analytics.tiktok.com/*',
    '*://pinrest.com/*',
    '*://ccai.com/*',
    '*://bell-npe-9jnycaz.ca.ccaiplatform.com/*',
    '*://bell-prod-jb0r6z7.ca.ccaiplatform.com/*',
  ];

  const browser = await chromium.launch({
    // headless is controlled by playwright.config.js (currently: false)
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--disable-blink-features=AutomationControlled',
    ],
  });
  
  const context = await browser.newContext({
    // Set custom headers (replicates extension behavior)
    extraHTTPHeaders: {
      'User-Agent': 'DynatraceSynthetic/1.295.15.20240628-164244',
      'SFTCAPTCHA': 'CAPTCHA'
    }
  });

  // Block URLs (replicates extension blocking)
  await context.route(new RegExp(blockedUrls.map(u => 
    u.replace(/\*/g, '.*').replace(/\//g, '\\/')
  ).join('|')), route => route.abort());
  
  return { browser, context };
}

/**
 * Gets or creates a page from the context
 * @param {BrowserContext} context - The browser context
 * @returns {Promise<Page>}
 */
export async function getPage(context) {
  return context.pages()[0] || await context.newPage();
}
