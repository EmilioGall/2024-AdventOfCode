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