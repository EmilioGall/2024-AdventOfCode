console.log('///// Main /////');

// Create a debounced version of the [sumOfMultiplications] function with 500ms delay
const debounceSumOfMultiplications = debounce(() => sumOfMultiplications(inputTextElem.value), 500);

// Create a debounced version of the [sumOfMultiplicationsWithExtra] function with 500ms delay
const debouncesumOfMultiplicationsWithExtra = debounce(() => sumOfMultiplicationsWithExtra(inputTextElem.value), 500);

// Add keypress event listener on [calculateButtonElem]
calculateButtonElem.addEventListener('click', function (e) {

   console.log('inputTextElem', inputTextElem.value);

   // Call debounced version of function [sumOfMultiplications]
   debounceSumOfMultiplications();

   // Call debounced version of function [sumOfMultiplicationsWithExtra]
   debouncesumOfMultiplicationsWithExtra();

});