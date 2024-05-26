console.log('background is running')

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }
})
// default open side panel
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))


chrome.storage.onChanged.addListener((changes, area) => {
  console.log('onChanged', changes, area)
});
