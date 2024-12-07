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
 * Description: function looks for patterns `mul(X, Y)` where X and Y are integers, and sums up the results of their multiplication.
 * 
 * @param {string} input - The input string containing potentially corrupted `mul` instructions.
 * @returns {number} totalSum - The total sum of the multiplications conducted from valid instructions.
 */
function sumOfMultiplications(input) {

   // Initialize total sum to store the sum of all valid multiplications
   let totalSum = 0;

   // Initialize index to iterate through the input string
   let i = 0;

   while (i < input.length) {

      // Check if the current substring matches "mul("
      if (input[i] === 'm' && input[i + 1] === 'u' && input[i + 2] === 'l' && input[i + 3] === '(') {

         // Move the index past the "mul("
         i += 4;

         // Initialize variables to hold the two numbers
         let num1 = '';
         let num2 = '';

         // Capture the first number by accumulating digits until a non-digit character is found
         while (i < input.length && (input[i].charCodeAt(0) >= 48 && input[i].charCodeAt(0) <= 57)) { // 0-9 in Unicode

            // Append the digit to num1
            num1 += input[i];

            // Move to the next character
            i++;

         };

         // After capturing the first number, check for a comma separating the two numbers
         if (input[i] === ',') {

            // Move past the comma
            i++;

         };

         // Capture the second number
         while (i < input.length && (input[i].charCodeAt(0) >= 48 && input[i].charCodeAt(0) <= 57)) {

            // Append the digit to num2
            num2 += input[i];

            // Move to the next character
            i++;

         };

         // Ensure the instruction ends with a closing parenthesis
         if (input[i] === ')') {

            // Convert the captured string numbers to integers
            const x = parseInt(num1);
            const y = parseInt(num2);

            // Multiply the two numbers and add to the total sum
            totalSum += x * y;

         };

      } else {

         // If the sequence does not match "mul(", just move to the next character
         i++;

      };

   };

   // Display the result in the output div
   outputDiv.innerText = `Part 1 - Total Mul Sum: ${totalSum}`;

   // Return the total sum of all valid multiplications
   return totalSum;

};


/**
 * Processes a corrupted memory string to compute the sum of valid multiplications while respecting enabled/disabled state based on `do()` and `don't()` instructions.
 *
 * @param {string} input - The input string containing potentially corrupted instructions.
 * @returns {number} totalSum - The total sum of the enabled multiplications.
 */
function sumOfMultiplicationsWithExtra(input) {

   // Initialize total sum to store the sum of all valid multiplications
   let totalSum = 0;

   // Initialize index to iterate through the input string
   let i = 0;

   // We start with multiplication instructions enabled
   let isEnabled = true;

   // Loop through each character in the input string
   while (i < input.length) {

      // Check for 'do()' instruction
      if (input[i] === 'd' && input[i + 1] === 'o' && input[i + 2] === '(' && input[i + 3] === ')') {

         // Enable multiplications
         isEnabled = true;

         // Move past 'do()'
         i += 4;

         // Continue to the next iteration
         continue;

      };

      // Check for 'don't()' instruction
      if (input[i] === 'd' && input[i + 1] === 'o' && input[i + 2] === 'n' && input[i + 3] === "'") {

         // Disable multiplications
         isEnabled = false;

         // Move past 'don't()'
         i += 6;

         // Continue to the next iteration
         continue;

      };

      // Look for the pattern "mul(" while safely checking for bounds
      if (input[i] === 'm' && input[i + 1] === 'u' && input[i + 2] === 'l' && input[i + 3] === '(') {

         // Move past "mul("
         i += 4;

         let num1 = '';
         let num2 = '';

         // Capture the first number
         while (i < input.length && (input[i].charCodeAt(0) >= 48 && input[i].charCodeAt(0) <= 57)) {

            // Append the digit to num1
            num1 += input[i];

            // Move to the next character
            i++;

         };

         // Look for a comma
         if (input[i] === ',') {

            // Move past the comma
            i++;

         };

         // Capture the second number
         while (i < input.length && (input[i].charCodeAt(0) >= 48 && input[i].charCodeAt(0) <= 57)) {

            // Append the digit to num2
            num2 += input[i];

            // Move to the next character
            i++;

         };

         // Check for closing parenthesis
         if (input[i] === ')') {

            // Only proceed if multiplications are enabled
            if (isEnabled) {

               // Convert the captured string numbers to integers
               const x = parseInt(num1);
               const y = parseInt(num2);

               // Multiply the two numbers and add to the total sum
               totalSum += x * y;

            };

         };

      } else {

         // Move to the next character if no match found
         i++;

      };

   };
   
   // Display the result in the output div
   outputDiv2.innerText = `Part 2 - Total Mul Sum: ${totalSum}`;

   // Return the total sum of all enabled multiplications
   return totalSum;

};