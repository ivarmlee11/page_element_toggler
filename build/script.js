console.log('Element toggler loaded via Google Chrome Extensions ........ :D');
let eraserOn = false;

document.body.addEventListener('click', (e) => {  

  if (eraserOn) {
    let chosenElement = e.target;
    chosenElement.style.backgroundColor = 'red';

    setTimeout(() => {
      chosenElement.style.display = 'none';
    }, 1000);
  }

});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log(req.data);
  let currentUrl = window.location.href;
  switch (req.data) {
    case 'reset page':
      sendResponse({ data: currentUrl });
      window.location.reload();
      break;
    case true:
      eraserOn = true;
      sendResponse({ data: 'eraser has been toggled on!' });
      break;
    case false:
      eraserOn = false;
      sendResponse({ data: 'eraser has been toggled off!' });
      break;
    case 'get current page':
      sendResponse({ data: currentUrl });
      break;
    default:
  }
});
  
