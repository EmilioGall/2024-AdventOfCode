/**
 * Description: function to delay the execution of a provided function [functionToCall] by a specified amount of time [delay].
 * @param {function} functionToCall - The function to be called
 * @param {number} delay - The delay in milliseconds before the function is executed
 * @returns {function} - A debounced version of the input function
 */
function debounce(functionToCall, delay) {

   // Define a variable to hold the timeout reference
   let timeout;

   // Return a new function that takes any number of arguments
   return function (...args) { // capture arguments passed to the debounced function

      // Clear any previously set timeout to reset the delay
      clearTimeout(timeout);

      // Capture the context (this value) of the original function
      const context = this;

      // Set a new timeout that will call the original function after the specified delay
      timeout = setTimeout(() => {

         // Call the function with the correct context and arguments
         functionToCall.apply(context, args);

      }, delay);

   };

};


/**
 * Description: function calculate the total distance between two lists.
 * @param {array} array1
 * @param {array} array2
 * @returns {number}
 */
function calculateTotalDistance(array1, array2) {

   // Sort both lists in ascending order
   const sortedArray1 = array1.sort((a, b) => a - b);

   const sortedArray2 = array2.sort((a, b) => a - b);

   // Calculate the total distance
   let totalDistance = 0;

   for (let i = 0; i < Math.min(sortedArray1.length, sortedArray2.length); i++) {

      const distanceBetweenPairs = Math.abs(sortedArray1[i] - sortedArray2[i]);

      totalDistance += distanceBetweenPairs;

   };

   console.log(`totalDistance`, totalDistance);

   // Display the result in the output div
   outputDiv.innerText = `Part 1 - Total distance: ${totalDistance}`;

   return totalDistance;

};


/**
 * Description: function calculate the score of similarity between two lists.
 * @param {array} array1
 * @param {array} array2
 * @returns {number}
 */
function calculateSimilarityScore(array1, array2) {

   // Create a frequency map for the right list to count occurrences of each number
   const frequencyMap = {};

   for (const num of array2) {

      if (frequencyMap[num]) {

         frequencyMap[num]++;

      } else {

         frequencyMap[num] = 1;

      };

   };

   // Initialize the similarity score
   let similarityScore = 0;

   // Calculate the score for the left list based on the frequency map
   for (const num of array1) {

      // Get the count for the number, default to 0 if not found
      const count = frequencyMap[num] || 0;

      // Update the similarity score
      similarityScore += num * count;

   };

   console.log(`similarityScore`, similarityScore);

   // Display the result in the output div
   outputDiv2.innerText = `Part 2 - Similarity Score: ${similarityScore}`;

   return similarityScore;

};