const blockedUrls = [
  "*://analytics.tiktok.com/*",
  "*://pinrest.com/*",
  "*://ccai.com/*",
  "*://bell-npe-9jnycaz.ca.ccaiplatform.com/*",
  "*://bell-prod-jb0r6z7.ca.ccaiplatform.com/*",
];

const targetDomains = [
  "*://pp-service-aliant.bell.ca/myaccount*",
  "*://*.ids.int.bell.ca/*",
  "*://pp-service-aliant.bell.ca/*",
  "*://*.luckymobile.ca/*",
  "*://validation-*"
];

chrome.runtime.onInstalled.addListener(() => {
  const rules = [];

  // 1. Add Blocking Rules
  blockedUrls.forEach((url, index) => {
    rules.push({
      id: index + 1,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: url, resourceTypes: ["main_frame", "sub_frame", "script", "xmlhttprequest"] }
    });
  });

  // 2. Add Header Modification Rules
  targetDomains.forEach((domain, index) => {
    rules.push({
      id: index + 100, // Offset ID to avoid collision
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          { header: "User-Agent", operation: "set", value: "DynatraceSynthetic/1.295.15.20240628-164244" },
          { header: "SFTCAPTCHA", operation: "set", value: "CAPTCHA" }
        ]
      },
      condition: { urlFilter: domain, resourceTypes: ["main_frame", "sub_frame", "script", "xmlhttprequest"] }
    });
  });

  // Apply the rules
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(r => r.id), // Clean up old rules if they exist
    addRules: rules
  });
});