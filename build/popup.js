document.addEventListener('DOMContentLoaded', () => {

  const onOffButton = document.getElementById('toggleContentScript');
  const resetButton = document.getElementById('reset');
  const message = document.getElementById('message');
  
  let url;
  let eraserState;

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { data: 'get current page' }, (res) => {
      url = res.data;
      checkStorageForEraserState(url)
        .then((eraser) => {
          eraserState = eraser;
          toggleEraserAndSaveSettings(eraserState);
          changeViewBasedOnEraserState(eraserState, onOffButton, resetButton, message);
        });
    });
  });
             
  onOffButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    eraserState = !eraserState;

    changeViewBasedOnEraserState(eraserState, onOffButton, resetButton, message);

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { data: 'get current page' }, (res) => {
        console.log(`${res.data} response from get current page`);
        toggleEraserAndSaveSettings(eraserState, res.data);
      });
    });

  });
  
  resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    resetPage();
    changeViewBasedOnEraserState(false, onOffButton, resetButton, message);
  });

});

function toggleEraserAndSaveSettings(eraserState, currentDomain) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { data: eraserState }, (res) => {
      console.log(res.data);
    });
  });

  if(currentDomain) {
    let key = currentDomain;
    let dataObj = {};
    dataObj[key] = eraserState;

    console.log(`data object to be saved`);
    console.log(dataObj);

    chrome.storage.sync.set(
      {
        [key]: dataObj[key]
      }, () => {
        console.log(
          `current domain url <${currentDomain}>
           eraser status <${eraserState}> saved.`
        );
    });
  }
};

function checkStorageForEraserState(url) {
  return new Promise((resolve, reject) => {
    let eraserState = false;
    let domainName = url;
    chrome.storage.sync.get(null, (urlData) => {
      if(urlData[domainName]) {
        eraserState = urlData[domainName];
      }
      resolve(eraserState);
    });
  });
};

function resetPage() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { data: 'reset page' }, (res) => {
      let url = res.data;
      chrome.storage.sync.remove([url], () => {
      });
    });
  });
};

function changeViewBasedOnEraserState(eraserState, onOffButton, resetButton, message) {

  eraserState ? onOffButton.innerHTML = 'Stop Erasing'          : onOffButton.innerHTML = 'Start Erasing';
  eraserState ? document.body.className = 'red'                 : document.body.className = 'green';
  eraserState ? message.innerHTML = 'Press "Stop Erasing" to stop erasing page elements on mouse clicks.' : 
  message.innerHTML = 'Press "Start Erasing" to start erasing page elements on mouse clicks.';

};
