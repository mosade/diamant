
// default open side panel
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))


// chrome.storage.onChanged.addListener((changes, area) => {
//   console.log('onChanged', changes, area)
// });
