const suspendPrefix = "https://localhost:0/#";

const toggleSuspendUrl = (pageUrl) =>
  pageUrl.startsWith(suspendPrefix)
    ? pageUrl.replace(suspendPrefix, "")
    : `${suspendPrefix}${pageUrl}`;

if (chrome) {
  chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.update(tab.id, { url: toggleSuspendUrl(tab.url) });
  });
} else if (browser) {
  browser.browserAction.onClicked.addListener((tab) => {
    browser.tabs.update(tab.id, { url: toggleSuspendUrl(tab.url) });
  });
}
