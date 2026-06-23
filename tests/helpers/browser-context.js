export async function createContextWithExtension(workerIndex = 0, testInfo = null) {
  const blockedUrls = [
    '*://analytics.tiktok.com/*',
    '*://pinrest.com/*',
    '*://ccai.com/*',
    '*://bell-npe-9jnycaz.ca.ccaiplatform.com/*',
    '*://bell-prod-jb0r6z7.ca.ccaiplatform.com/*',
  ];

  const browser = await chromium.launch({
    headless: false,
    args: [
      '--disable-blink-features=AutomationControlled',
    ],
  });
  
  // Build video path with test name
  const videoConfig = testInfo ? {
    dir: 'test-results/videos/',
    size: { width: 1280, height: 720 }
  } : undefined;

  const context = await browser.newContext({
    extraHTTPHeaders: {
      'User-Agent': 'DynatraceSynthetic/1.295.15.20240628-164244',
      'SFTCAPTCHA': 'CAPTCHA'
    },
    recordVideo: videoConfig
  });

  await context.route(new RegExp(blockedUrls.map(u => 
    u.replace(/\*/g, '.*').replace(/\//g, '\\/')
  ).join('|')), route => route.abort());
  
  return { browser, context };
}