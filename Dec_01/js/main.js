console.log('///// Main /////');

// Create a debounced version of the [calculateTotalDistance] function with 500ms delay
const debounceDistance = debounce(() => calculateTotalDistance(leftList, rightList), 500);

// Create a debounced version of the [calculateSimilarityScore] function with 500ms delay
const debounceSimilarity = debounce(() => calculateSimilarityScore(leftList, rightList), 500);

// Add keypress event listener on [inputPasswordElem]
calculateButtonElem.addEventListener('click', function (e) {

   // console.log('Button clicked');

   // Call debounced version of function [calculateTotalDistance]
   debounceDistance();

   // Call debounced version of function [calculateSimilarityScore]
   debounceSimilarity();

});