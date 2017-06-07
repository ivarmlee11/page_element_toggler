document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const toggleContentScriptButton = document.getElementById('toggleContentScript');
  var flag = true;

  toggleContentScriptButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(`button pressed when the value of flag was ${flag}`);

    if (flag) {
      flag = false;
      toggleContentScriptButton.innerHTML = 'Turn On Extension';
    } else {
      flag = true;
      toggleContentScriptButton.innerHTML = 'Turn Off Extension';
    }

  });

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {data: toggleContenScript}, (response) => { 
      console.log(`
        succ-----------------------ess
        asdkasfaljsfaskjfnasjfasf
        asdjasfjkabsfjabsf
        asjkbdaskjbfasjkf
      `);
    });
  });

});

const toggleContenScript = (booleanValueToChange) => {
  booleanValueToChange = !booleanValueToChange;
  return booleanValueToChange;
}
