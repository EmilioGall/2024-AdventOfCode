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
 * Description: function determines if a given report is safe based on specific criteria.
 * 1. The levels are either strictly increasing or strictly decreasing.
 * 2. The absolute difference between any two adjacent levels is at least 1 and at most 3.
 * @param {array} report - An array of levels representing a single report.
 * @returns {boolean} - Returns true if the report is safe; otherwise, false.
 */
function isSafeReport(reportString) {

      // Convert the space-separated string into an array of numbers
      const report = reportString.split(' ').map(Number);

   // Flag to check if the levels are strictly increasing
   let isIncreasing = true;

   // Flag to check if the levels are strictly decreasing
   let isDecreasing = true;

   for (let i = 0; i < report.length - 1; i++) {

      // Calculate the absolute difference between adjacent levels
      const diff = Math.abs(report[i + 1] - report[i]);

      // Check if the difference is outside the acceptable range
      if (diff < 1 || diff > 3) {

         // Report is unsafe if any difference is outside the range
         return false;

      };

      // Check whether levels increase or decrease between adjacent values
      if (report[i + 1] > report[i]) {

         // Levels are not strictly decreasing
         isDecreasing = false;

      } else if (report[i + 1] < report[i]) {

         // Levels are not strictly increasing
         isIncreasing = false;

      };

   };

   // Return true if it’s strictly increasing or strictly decreasing
   return isIncreasing || isDecreasing;

};

/**
 * Description: function counts how many reports in an array are safe.
 * @param {array} reportsArray - A 2D array where each sub-array represents a report.
 * @returns {number} - The count of safe reports.
 */
function countSafeReports(reportsArray) {

   // Counter for safe reports
   let safeCount = 0;

   // Iterate through each report in the reports array
   for (const report of reportsArray) {

      // Check if the current report is safe
      if (isSafeReport(report)) {

         // Increment the count if the report is safe
         safeCount++;

      };

   };

   // Display the result in the output div
   outputDiv.innerText = `Part 1 - Total number of safe reports: ${safeCount}`;

   // Return the total count of safe reports
   return safeCount;

};


