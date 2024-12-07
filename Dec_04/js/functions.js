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
 * Description: function checks if the word "XMAS" can be found starting from a specific position (x, y) and moving in a specified direction (dx, dy).
 * 
 * @param {number} x - The starting x-coordinate in the grid.
 * @param {number} y - The starting y-coordinate in the grid.
 * @param {number} dx - The delta x (direction to move on the x-axis).
 * @param {number} dy - The delta y (direction to move on the y-axis).
 * @returns {boolean} - Returns true if "XMAS" can be found, false otherwise.
 */
function checkWord(grid, word, wordLength, width, height, x, y, dx, dy) {

   // Loop through each character of "XMAS"
   for (let i = 0; i < wordLength; i++) {

      // Calculate the new coordinates based on the current index, direction of movement
      const newX = x + (i * dx);
      const newY = y + (i * dy);

      // Check for out-of-bounds conditions or if the current character does not match
      if (newX < 0 || newX >= width || newY < 0 || newY >= height || grid[newY][newX] !== word[i]) {

         // Return false if any issue is encountered
         return false;

      };

   };

   // If all characters matched, return true
   return true;

};


/**
 * Description: function counts occurrences of the word "XMAS" in a given 2D grid. The search supports various orientations such as horizontal, vertical, diagonal, and their reversed counterparts.
 * 
 * @param {array} grid - A 2D array of characters representing the letter grid.
 * @returns {number} - The total number of times "XMAS" appears in the grid.
 */
function countXMASOccurrences(grid) {

   // Define the target word
   const word = "XMAS";

   // Calculate the length of the target word
   const wordLength = word.length;

   // Determine the height (number of rows) of the grid
   const height = grid.length;

   // Determine the width (number of columns) of the grid
   const width = grid[0].length;

   // Initialize a counter to track the number of occurrences of "XMAS"
   let count = 0;

   // Array of direction vectors to explore for the word "XMAS"
   const directions = [

      { dx: 1, dy: 0 },   // Right
      { dx: -1, dy: 0 },  // Left
      { dx: 0, dy: 1 },   // Down
      { dx: 0, dy: -1 },  // Up
      { dx: 1, dy: 1 },   // Down-Right
      { dx: -1, dy: -1 }, // Up-Left
      { dx: -1, dy: 1 },  // Down-Left
      { dx: 1, dy: -1 },  // Up-Right

   ];

   // Iterate over every cell (y, x) in the grid
   for (let y = 0; y < height; y++) {

      for (let x = 0; x < width; x++) {

         // For each cell, check all possible directions
         for (const dir of directions) {

            // If we find "XMAS" in the current direction
            if (checkWord(grid, word, wordLength, width, height, x, y, dir.dx, dir.dy)) {

               // Increment the occurrence counter
               count++;

            };

         };

      };

   };

   // Display the result in the output div
   outputDiv.innerText = `Part 1 - Total XMAS Occurrencies: ${count}`;

   // Return the total count of occurrences found
   return count;

};

/**
 * Description: function checks if the word "X-MAS" can be found starting from a specific position (x, y) and following the pattern of "X-MAS".
 * 
 * @param {number} x - The starting x-coordinate in the grid.
 * @param {number} y - The starting y-coordinate in the grid.
 * @param {array} grid - The 2D array representing the letter grid.
 * @param {number} width - The number of columns in the grid.
 * @param {number} height - The number of rows in the grid.
 * @returns {boolean} - Returns true if "X-MAS" can be found, false otherwise.
 */
function checkXMAS(x, y, grid, width, height) {

   // Check if we have enough space for the X-MAS structure
   if (x + 2 >= width || y + 2 >= height) {

      return false; // Out of bounds

   };

   // Check for the "MSAMS" structure
   const msams = (

      grid[y][x] === 'M' && // Top-left
      grid[y][x + 2] === 'S' && // Top-right
      grid[y + 1][x + 1] === 'A' && // Center
      grid[y + 2][x] === 'M' && // Bottom-left
      grid[y + 2][x + 2] === 'S' // Bottom-right

   );

   // Check for the "MMASS" structure 
   const mmass = (

      grid[y][x] === 'M' && // Top-left
      grid[y][x + 2] === 'M' && // Top-right
      grid[y + 1][x + 1] === 'A' && // Center
      grid[y + 2][x] === 'S' && // Bottom-left
      grid[y + 2][x + 2] === 'S' // Bottom-right

   );

   // Check for the "SSAMM" structure
   const ssamm = (

      grid[y][x] === 'S' && // Top-left
      grid[y][x + 2] === 'S' && // Top-right
      grid[y + 1][x + 1] === 'A' && // Center
      grid[y + 2][x] === 'M' && // Bottom-left
      grid[y + 2][x + 2] === 'M' // Bottom-right

   );

   // Check for the "SMASM" structure
   const smasm = (

      grid[y][x] === 'S' && // Top-left
      grid[y][x + 2] === 'M' && // Top-right
      grid[y + 1][x + 1] === 'A' && // Center
      grid[y + 2][x] === 'S' && // Bottom-left
      grid[y + 2][x + 2] === 'M' // Bottom-right

   );

   // Return true if either configuration is found
   return msams || mmass || ssamm || smasm;

};

/**
* Description: function counts occurrences of "X-MAS" in the shape of X in a given 2D grid. The function looks for the defined structure of "X-MAS".
* 
* @param {array} grid - A 2D array of characters representing the letter grid.
* @returns {number} - The total number of times "X-MAS" appears as an X.
*/
function countXMAS(grid) {

   // Determine the height (number of rows) of the grid
   const height = grid.length;

   // Determine the width (number of columns) of the grid
   const width = grid[0].length;

   // Initialize a counter to track the number of occurrences of "X-MAS"
   let count = 0;

   // Iterate over every cell (y, x) in the grid
   for (let y = 0; y < height; y++) {

      for (let x = 0; x < width; x++) {

         // Check if "X-MAS" can be found at the current position
         if (checkXMAS(x, y, grid, width, height)) {

            count++; // Increment count if found

         };

      };

   };

   // Display the result in the output div
   outputDiv2.innerText = `Part 2 - Total X-MAS Occurrencies: ${count}`;

   // Return the total count of occurrences found
   return count;

};