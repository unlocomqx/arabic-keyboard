let text = "";
let on = false;

async function sendTabMessage(msg) {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    try {
      await chrome.tabs.sendMessage(tab.id, {doit: msg});
    } catch (error) {
      console.log(`Failed to send message to tab ${tab.id}:`, error);
    }
  }
}

chrome.tabs.onCreated.addListener(async function (tab) {
  try {
    const message = on ? "active" : "inactive";
    await chrome.tabs.sendMessage(tab.id, {doit: message});
  } catch (error) {
    console.log(`Failed to send message to new tab ${tab.id}:`, error);
  }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.mission) {
      case "setIco":
        if (on) {
          on = false;
          chrome.action.setIcon({path: "icon.png"});
          sendTabMessage("inactive");
        } else {
          on = true;
          chrome.action.setIcon({path: "icona.png"});
          sendTabMessage("active");
        }
        break;
      case "setText":
        text = request.Text;
        break;
      case "getText":
        sendResponse({Text: text});
        break;
    }
  }
);
