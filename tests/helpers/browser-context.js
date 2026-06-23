import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates browser context replicating extension functionality
 * Supports headless, parallel execution, and video recording
 * @param {number} workerIndex - Playwright worker index for parallel isolation
 * @returns {Promise<{browser: Browser, context: BrowserContext}>}
 */
export async function createContextWithExtension(workerIndex = 0) {
  // Blocked URLs from extension
  const blockedUrls = [
    '*://analytics.tiktok.com/*',
    '*://pinrest.com/*',
    '*://ccai.com/*',
    '*://bell-npe-9jnycaz.ca.ccaiplatform.com/*',
    '*://bell-prod-jb0r6z7.ca.ccaiplatform.com/*',
  ];

  // Launch browser WITHOUT extension
  const browser = await chromium.launch({
    // Headless controlled by playwright.config.js
    args: [
      '--disable-blink-features=AutomationControlled',
    ],
  });
  
  // Create context with custom headers (replicates extension)
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'User-Agent': 'DynatraceSynthetic/1.295.15.20240628-164244',
      'SFTCAPTCHA': 'CAPTCHA'
    },
    recordVideo: {
      dir: 'test-results/videos/',
      size: { width: 1280, height: 720 }
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
