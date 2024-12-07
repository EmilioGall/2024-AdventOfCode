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
function checkWord(x, y, dx, dy) {

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
 * @param {string[][]} grid - A 2D array of characters representing the letter grid.
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
            if (checkWord(x, y, dir.dx, dir.dy)) {

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