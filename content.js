function injectButton() {
  if (!document.getElementById('timeTrackingButton')) {
    const button = document.createElement('button');
    button.id = 'timeTrackingButton';
    button.textContent = 'Time Tracking';
    button.style.position = 'fixed';
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.style.zIndex = '1000';
    document.body.appendChild(button);

    button.addEventListener('click', () => {
      const projectTitleElement = document.querySelector('.gdhfnn.fhfj');
      const projectTitle = projectTitleElement ? projectTitleElement.innerText : 'Unknown Project';

      const dialog = document.createElement('div');
      dialog.id = 'timeTrackingDialog';
      dialog.style.position = 'fixed';
      dialog.style.top = '50%';
      dialog.style.left = '50%';
      dialog.style.transform = 'translate(-50%, -50%)';
      dialog.style.backgroundColor = 'white';
      dialog.style.padding = '20px';
      dialog.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      dialog.innerHTML = `
        <h2>Time Tracking</h2>
        <p id="projectTitle">Project Title: <span>${projectTitle}</span></p>
        <button id="doneButton">Done</button>
      `;
      document.body.appendChild(dialog);

      document.getElementById('doneButton').addEventListener('click', () => {
        const projectTitle = document.querySelector('#projectTitle span').innerText;
        chrome.runtime.sendMessage({ type: 'START_TIMER', title: projectTitle });
        document.body.removeChild(dialog);
      });
    });
  }
}

function removeButton() {
  const button = document.getElementById('timeTrackingButton');
  if (button) {
    button.remove();
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'INJECT_BUTTON') {
    injectButton();
  } else if (request.type === 'REMOVE_BUTTON') {
    removeButton();
  }
});
