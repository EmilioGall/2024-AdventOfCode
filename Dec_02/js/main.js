console.log('///// Main /////');

// Create a debounced version of the [countSafeReports] function with 500ms delay
const debounceSafeReports = debounce(() => countSafeReports(reportsArray), 500);

// Add keypress event listener on [calculateButtonElem]
calculateButtonElem.addEventListener('click', function (e) {

   // console.log('Button clicked');

   // Call debounced version of function [countSafeReports]
   debounceSafeReports();


});