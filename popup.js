document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const statusText = document.getElementById('status');
  
    // Get the current tab's URL
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const tab = tabs[0];
      const url = new URL(tab.url);
  
      // Only proceed if on Roblox's domain
      if (url.hostname === 'www.roblox.com') {
        const profileId = url.pathname.split('/')[2]; // Get the user ID from the URL
        
        // Load saved settings
        chrome.storage.sync.get([profileId], function(data) {
          const isEnabled = data[profileId] || false;
          updateUI(isEnabled);
  
          toggleButton.addEventListener('click', function() {
            const newStatus = !isEnabled;
            chrome.storage.sync.set({[profileId]: newStatus}, function() {
              updateUI(newStatus);
              chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ['content.js']
              });
            });
          });
        });
      } else {
        statusText.textContent = 'This extension only works on roblox.com';
        toggleButton.disabled = true;
      }
    });
  
    function updateUI(isEnabled) {
      toggleButton.textContent = isEnabled ? 'Disable on this Profile' : 'Enable on this Profile';
      statusText.textContent = isEnabled ? 'Modification is enabled' : 'Modification is disabled';
    }
  });  