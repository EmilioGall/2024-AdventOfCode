console.log('///// Main /////');

// Create a debounced version of the [executeBoolkaichiTournament] function with 500ms delay
const debouncedCalculation = debounce(() => calculateTotalDistance(leftList, rightList), 500);

// Add keypress event listener on [inputPasswordElem]
calculateButtonElem.addEventListener('click', function (e) {

   // console.log('Button clicked');

   // Call debounced version of controls
   debouncedCalculation();

});