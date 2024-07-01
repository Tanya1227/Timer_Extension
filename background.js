
//updated
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.title) {
//     const startTime = new Date().getTime();
//     chrome.storage.local.get({ projects: [] }, (data) => {
//       const projects = data.projects;
//       projects.push({ title: message.title, startTime });
//       chrome.storage.local.set({ projects });
//     });

//     chrome.action.setPopup({
//       popup: `popup.html`
//     });
//   } else if (message.action === 'enable') {
//     chrome.action.setBadgeText({ text: 'ON', tabId: sender.tab.id });
//     chrome.action.setBadgeBackgroundColor({ color: '#00FF00', tabId: sender.tab.id });

//     chrome.scripting.executeScript({
//       target: { tabId: sender.tab.id },
//       function: injectClickMeButton
//     });
//   } else if (message.action === 'disable') {
//     chrome.action.setBadgeText({ text: 'OFF', tabId: sender.tab.id });
//     chrome.action.setBadgeBackgroundColor({ color: '#FF0000', tabId: sender.tab.id });

//     chrome.scripting.executeScript({
//       target: { tabId: sender.tab.id },
//       function: removeClickMeButton
//     });

//     // Clear the projects from storage
//     chrome.storage.local.remove('projects');
//   }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.title) {
    const startTime = new Date().getTime();
    chrome.storage.local.get({ projects: [] }, (data) => {
      const projects = data.projects;

      // Stop the timer for the previous project if it exists
      if (projects.length > 0) {
        const previousProject = projects[projects.length - 1];
        if (!previousProject.pausedTime) {
          previousProject.pausedTime = new Date().getTime(); // Pause the timer
          previousProject.pausedDuration = 0; // Reset paused duration
        }
      }

      // Add the new project
      projects.push({ title: message.title, startTime });
      chrome.storage.local.set({ projects });

      // Update the popup to reflect the changes
      chrome.action.setPopup({
        popup: `popup.html`
      });
    });
  } else if (message.action === 'enable') {
    chrome.action.setBadgeText({ text: 'ON', tabId: sender.tab.id });
    chrome.action.setBadgeBackgroundColor({ color: '#00FF00', tabId: sender.tab.id });

    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: injectClickMeButton
    });
  } else if (message.action === 'disable') {
    chrome.action.setBadgeText({ text: 'OFF', tabId: sender.tab.id });
    chrome.action.setBadgeBackgroundColor({ color: '#FF0000', tabId: sender.tab.id });

    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: removeClickMeButton
    });

    // Clear the projects from storage
    chrome.storage.local.remove('projects');
  }
});

