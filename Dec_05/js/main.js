console.log('///// Main /////');

// Create a debounced version of the [processUpdates] function with 500ms delay
const debounceCounter = debounce(() => processUpdates(rulesInput, updatesInput), 500);

// Add keypress event listener on [calculateButtonElem]
calculateButtonElem.addEventListener('click', function (e) {

   // console.log('Button clicked');

   // Call debounced version of function [processUpdates]
   debounceCounter();

});