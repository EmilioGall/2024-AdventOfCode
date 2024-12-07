console.log('///// Main /////');

// Create a debounced version of the [countXMASOccurrences] function with 500ms delay
const debounceCounter = debounce(() => countXMASOccurrences(formattedGrid), 500);

// Create a debounced version of the [countXMAS] function with 500ms delay
const debounceCounterXMAS = debounce(() => countXMAS(formattedGrid), 500);

// Add keypress event listener on [calculateButtonElem]
calculateButtonElem.addEventListener('click', function (e) {

   // console.log('Button clicked');

   // Call debounced version of function [countXMASOccurrences]
   debounceCounter();

   // Call debounced version of function [debounceCounterXMAS]
   debounceCounterXMAS();


});