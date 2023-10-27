import { func } from "./script";

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    tab.url &&
    /^https:\/\/loungegame.site\/sameanswer\//.test(tab.url) &&
    changeInfo.audible
  ) {
    const key = "isOgiriModeEnabled";
    const storage = await chrome.storage.sync.get(key);
    const isEnabled = !!storage[key];
    if (!isEnabled) {
      console.log("unofficial tver feat is disabled");
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: func,
    });
  }
});

export {};
