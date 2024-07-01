

// function updateProjectList(projects) {
//   const projectList = document.getElementById('project-list');
//   projectList.innerHTML = ''; // Clear existing list

//   projects.forEach((project, index) => {
//     const projectElement = document.createElement('div');
//     projectElement.classList.add('project-item');

//     // Project Title
//     const titleElement = document.createElement('div');
//     titleElement.classList.add('project-title');
//     titleElement.innerText = project.title;
//     projectElement.appendChild(titleElement);

//     // Elapsed Time
//     const timeElement = document.createElement('div');
//     timeElement.classList.add('elapsed-time');
//     timeElement.id = `timer-${index}`;
//     timeElement.innerText = formatTime(getElapsedTime(project.startTime));
//     projectElement.appendChild(timeElement);

//     // Stop Timer Button
//     const stopButton = document.createElement('button');
//     stopButton.classList.add('stop-button');
//     stopButton.innerText = 'Stop Timer';
//     stopButton.addEventListener('click', () => {
//       stopTimer(index);
//     });
//     projectElement.appendChild(stopButton);

//     projectList.prepend(projectElement);
//   });
// }

// function getElapsedTime(startTime) {
//   const currentTime = new Date().getTime();
//   return Math.floor((currentTime - startTime) / 1000);
// }

// function formatTime(seconds) {
//   const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
//   const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
//   const secs = (seconds % 60).toString().padStart(2, '0');
//   return `${hrs}:${mins}:${secs}`;
// }

// function stopTimer(index) {
//   chrome.storage.local.get('projects', (data) => {
//     const projects = data.projects || [];
//     if (index >= 0 && index < projects.length) {
//       const updatedProjects = [...projects];
//       updatedProjects[index].pausedTime = new Date().getTime(); // Store paused time
//       chrome.storage.local.set({ projects: updatedProjects }, () => {
//         updateElapsedTime(); // Update elapsed time display
//       });
//     }
//   });
// }

// document.getElementById('enable-button').addEventListener('click', () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       function: injectClickMeButton
//     });
//   });
// });

// document.getElementById('disable-button').addEventListener('click', () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       function: removeClickMeButton
//     });
//   });

//   // Clear the projects from storage and update the popup
//   chrome.storage.local.remove('projects', () => {
//     updateProjectList([]);
//   });
// });

// chrome.storage.local.get('projects', (data) => {
//   const projects = data.projects || [];
//   updateProjectList(projects);
//   setInterval(() => {
//     projects.forEach((project, index) => {
//       const elapsedTime = project.pausedTime ?
//         getElapsedTime(project.startTime) + Math.floor((project.pausedTime - project.startTime) / 1000) :
//         getElapsedTime(project.startTime);
//       document.getElementById(`timer-${index}`).innerText = formatTime(elapsedTime);
//     });
//   }, 1000); // Update the elapsed time every second
// });


// function injectClickMeButton() {
//   if (!document.getElementById('click-me-button')) {
//     const button = document.createElement('button');
//     button.id = 'click-me-button';
//     button.innerText = 'Click Me';
//     button.style.position = 'fixed';
//     button.style.bottom = '10px';
//     button.style.right = '10px';
//     button.addEventListener('click', () => {
//       const projectTitle = document.querySelector('.gh-header-title.mb-2.lh-condensed.f1.mr-0.flex-auto.wb-break-word').innerText;
//       const dialog = document.createElement('dialog');
//       dialog.innerHTML = `
//         <form method="dialog">
//           <p>${projectTitle}</p>
//           <button id="done-button">Done</button>
//         </form>
//       `;
//       document.body.appendChild(dialog);
//       dialog.showModal();

//       dialog.querySelector('#done-button').addEventListener('click', () => {
//         chrome.runtime.sendMessage({ title: projectTitle });
//         dialog.close();
//         dialog.remove();
//       });
//     });
//     document.body.appendChild(button);
//   }
// }

// function removeClickMeButton() {
//   const button = document.getElementById('click-me-button');
//   if (button) {
//     button.remove();
//   }
// }

function updateProjectList(projects) {
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = ''; // Clear existing list

  projects.forEach((project, index) => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project-item');

    // Project Title
    const titleElement = document.createElement('div');
    titleElement.classList.add('project-title');
    titleElement.innerText = project.title;
    projectElement.appendChild(titleElement);

    // Elapsed Time
    const timeElement = document.createElement('div');
    timeElement.classList.add('elapsed-time');
    timeElement.id = `timer-${index}`;
    timeElement.innerText = formatTime(getElapsedTime(project.startTime));
    projectElement.appendChild(timeElement);

    // Stop Timer Button
    const stopButton = document.createElement('button');
    stopButton.classList.add('stop-button');
    stopButton.innerText = 'Stop Timer';
    stopButton.addEventListener('click', () => {
      stopTimer(index);
    });
    projectElement.appendChild(stopButton);

    projectList.prepend(projectElement);
  });
}

function getElapsedTime(startTime) {
  const currentTime = new Date().getTime();
  return Math.floor((currentTime - startTime) / 1000);
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function stopTimer(index) {
  chrome.storage.local.get('projects', (data) => {
    const projects = data.projects || [];
    if (index >= 0 && index < projects.length) {
      const updatedProjects = [...projects];
      updatedProjects[index].pausedTime = new Date().getTime(); // Store paused time
      chrome.storage.local.set({ projects: updatedProjects }, () => {
        updateElapsedTime(); // Update elapsed time display
      });
    }
  });
}

document.getElementById('enable-button').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: injectClickMeButton
    });
  });
});

document.getElementById('disable-button').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: removeClickMeButton
    });
  });

  // Clear the projects from storage and update the popup
  chrome.storage.local.remove('projects', () => {
    updateProjectList([]);
  });
});

chrome.storage.local.get('projects', (data) => {
  const projects = data.projects || [];
  updateProjectList(projects);
  setInterval(() => {
    projects.forEach((project, index) => {
      const elapsedTime = project.pausedTime ?
        getElapsedTime(project.startTime) + Math.floor((project.pausedTime - project.startTime) / 1000) :
        getElapsedTime(project.startTime);
      document.getElementById(`timer-${index}`).innerText = formatTime(elapsedTime);
    });
  }, 1000); // Update the elapsed time every second
});

function injectClickMeButton() {
  if (!document.getElementById('click-me-button')) {
    const button = document.createElement('button');
    button.id = 'click-me-button';
    button.innerText = 'Time Tracking';

    button.style.cursor = 'pointer';
    button.addEventListener('click', () => {
      const projectTitle = document.querySelector('.gh-header-title.mb-2.lh-condensed.f1.mr-0.flex-auto.wb-break-word').innerText;
      const dialog = document.createElement('dialog');
      dialog.innerHTML = `
        <form method="dialog">
          <p>${projectTitle}</p>
          <button id="done-button">Done</button>
        </form>
      `;
      document.body.appendChild(dialog);
      dialog.showModal();

      dialog.querySelector('#done-button').addEventListener('click', () => {
        chrome.runtime.sendMessage({ title: projectTitle });
        dialog.close();
        dialog.remove();
      });
    });
    document.body.appendChild(button);
  }
}

function removeClickMeButton() {
  const button = document.getElementById('click-me-button');
  if (button) {
    button.remove();
  }
}
