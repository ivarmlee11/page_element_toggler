console.log('Element toggler loaded via Google Chrome Extensions :D');

document.body.addEventListener('click', (event) => {  
  // highlight the mouseenter target
  const oldBgColor = event.target.style.backgroundColor;
  
  // console.log(`old bg color ${oldBgColor}`);

  event.target.style.backgroundColor = "red";

  // reset the color after a short delay
  setTimeout(() => {
      event.target.style.backgroundColor = oldBgColor;
    }, 1000);
});
