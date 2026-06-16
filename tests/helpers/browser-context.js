import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates browser context with extension functionality replicated
 * Preserves video/screenshot/trace capabilities
 * @param {Browser} browser - Playwright's browser fixture
 * @returns {Promise<BrowserContext>}
 */
export async function createContextWithExtension(browser) {
  // Blocked URLs from extension
  const blockedUrls = [
    '*://analytics.tiktok.com/*',
    '*://pinrest.com/*',
    '*://ccai.com/*',
    '*://bell-npe-9jnycaz.ca.ccaiplatform.com/*',
    '*://bell-prod-jb0r6z7.ca.ccaiplatform.com/*',
  ];

  const context = await browser.newContext({
    // Replicate extension's header modification
    extraHTTPHeaders: {
      'User-Agent': 'DynatraceSynthetic/1.295.15.20240628-164244',
      'SFTCAPTCHA': 'CAPTCHA'
    }
  });

  // Replicate extension's URL blocking
  await context.route(new RegExp(blockedUrls.map(u => 
    u.replace(/\*/g, '.*').replace(/\//g, '\\/')
  ).join('|')), route => route.abort());
  
  return context;
}

/**
 * Gets or creates a page from the context
 * @param {BrowserContext} context - The browser context
 * @returns {Promise<Page>}
 */
export async function getPage(context) {
  return context.pages()[0] || await context.newPage();
}
