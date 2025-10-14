async function pinnedProtector(details) {
  // We are only interested in traditional navigation happening
  if (!(
    details.frameId === 0 &&
    details.parentFrameId === -1 &&
    details.tabId !== -1
  )) { return {}; }

  // Get the requesting tab now that we've short circuited all we can without further details
  const requestingTab = await browser.tabs.get(details.tabId);

  // We are only interested if the navigation is happening within a pinned tab
  if (!requestingTab.pinned) { return {}; }

  // We are only interested in attempts to navigate away from the pinned hostname
  if ((new URL(requestingTab.url)).hostname === (new URL(details.url)).hostname) { return {}; }

  // There is navigation happening within a pinned tab, to a new hostname
  // Block the request, and open it in a new tab
  browser.tabs.create({
    url: details.url,
    active: true,
    openerTabId: details.tabId
  });
  return {
    cancel: true
  };
}

browser.webRequest.onBeforeRequest.addListener(
  pinnedProtector, {
    types: ["main_frame"],
    urls: ["<all_urls>"]
  },
  ["blocking"]
);
