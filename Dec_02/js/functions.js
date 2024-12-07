/**
 * Description: function to delay the execution of a provided function [functionToCall] by a specified amount of time [delay].
 * 
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
 * 
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
 * Description: function checks if a report can become safe by removing one level.
 * 
 * @param {string} reportString - A string representing space-separated levels of a single report.
 * @returns {boolean} - Returns true if the report can be made safe by removing one level; otherwise, false.
 */
function canBeSafeByRemovingOne(reportString) {

   // Split the input string into an array of numbers representing levels
   const report = reportString.split(' ').map(Number);

   // Iterate over each level in the report
   for (let i = 0; i < report.length; i++) {

      // Create a new report by excluding the level at index i
      const newReport = [...report.slice(0, i), ...report.slice(i + 1)];

      // Convert the newReport array back to a string format
      const newReportString = newReport.toString();

      // Replace commas with spaces to match the input format
      const newReportStringRight = newReportString.replaceAll(',', ' ');

      // Check if the modified report is safe using the isSafeReport function
      if (isSafeReport(newReportStringRight)) {

         // Found a configuration that is safe by removing one level
         return true;

      };

   };

   // None of the configurations produced a safe report
   return false;

};

/**
 * Description: function counts how many reports in an array are safe.
 * 
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

/**
 * Description: function counts how many reports in an array are safe.
 * 
 * @param {array} reportsArray - A 2D array where each sub-array represents a report.
 * @returns {number} - The count of safe reports.
 */
function countSafeReportsWithProblemDampener(reportsArray) {

   // Counter for safe reports
   let safeCount = 0;

   // Iterate through each report in the reports array
   for (const report of reportsArray) {

      // Check if the current report is safe or can be made safe by removing one level
      if (isSafeReport(report) || canBeSafeByRemovingOne(report)) {

         // Increment the count if the report is safe
         safeCount++;

      };

   };

   // Display the result in the output div
   outputDiv2.innerText = `Part 2 - Total number of safe reports: ${safeCount}`;

   // Return the total count of safe reports
   return safeCount;

};


