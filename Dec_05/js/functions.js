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
 * Description: Parses an array of strings into a structured array of rule objects, each containing a 'before' and 'after' property indicating the order requirements for items
 * 
 * @param {Array<string>} rulesArray - An array of strings where each string contains two page IDs separated by a '|'
 * @returns {Array<Object>} - An array of rule objects, each with 'before' and 'after' properties
 */
function parseRules(rulesArray) {

   // Initialize an array to hold rule objects
   const rules = [];

   // Iterate over each rule in the provided array
   for (const rule of rulesArray) {

      // Create a rule object with 'before' and 'after' properties
      const ruleSet = { before: rule[0], after: rule[1] };

      // console.log('ruleSet', ruleSet);

      // Append the constructed rule object to the rules array
      rules.push(ruleSet);

   };

   // Return the array of rules created from the rulesArray input
   return rules;

};

/**
 * Description: Checks whether the order of pages in an update adheres to the defined ordering rules
 * 
 * @param {Array<string>} update - An array of page IDs representing the order of pages
 * @param {Array<Object>} rules - An array of rule objects defining the required ordering
 * @returns {boolean} - Returns true if the update follows the rules; false if any rules are violated
 */
function isCorrectlyOrdered(update, rules) {

   // Object to track the index positions of each page in the update
   const positionMap = {};

   // Map each page ID to its position/index in the provided update array
   update.forEach((page, index) => (positionMap[page] = index));

   console.log('positionMap', positionMap);

   // Validate each rule against the current update
   for (const rule of rules) {

      // Page ID that must come before
      const before = rule.before;

      // Page ID that must come after
      const after = rule.after;

      // Only proceed if both pages exist in the update
      if (before in positionMap && after in positionMap) {

         // Check the positional requirement of 'before' and 'after'
         if (positionMap[before] > positionMap[after]) {

            console.log(`%cViolation: ${before} appears after ${after}.`, 'color:black; background-color:brown;padding:5px; font-size:15px');

            // Rule violation found, so return false
            return false;

         };

      };

   };

   // If all rules are satisfied, return true
   return true;

};

/**
 * Description: Finds the middle page ID from an update
 * 
 * @param {Array<string>} update - An array of page IDs representing the order of pages
 * @returns {string} - The page ID that is located in the middle of the update array
 */
function getMiddlePage(update) {

   // Calculate the middle index
   const middleIndex = Math.floor(update.length / 2);

   // Return the page ID at the middle index
   return update[middleIndex];

};

/**
 * Description: function swaps the values of two keys in an object if both keys exist
 * 
 * @param {Object} obj - The input object containing keys to swap
 * @param {any} key1 - The first key to swap
 * @param {any} key2 - The second key to swap
 * @returns {Object|undefined} - Returns the modified object, or undefined if the keys do not exist
 */
function swapKeys(obj, key1, key2) {

   // Create a shallow copy of the input object to avoid mutating the original
   let objCopy = { ...obj }

   // Check if the keys exist in the object
   if (objCopy.hasOwnProperty(key1) && objCopy.hasOwnProperty(key2)) {

      // Store the values temporarily
      let temp = objCopy[key1];

      // Swap the values
      objCopy[key1] = objCopy[key2];
      objCopy[key2] = temp;

      // Return the modified object
      return objCopy;

   } else {

      // Key(s) provided do not exist in the object, log a message to the console
      console.log("One or both keys do not exist in the object.");

   };

};

/**
 * Description: function corrects the order of pages in an incorrect update based on the rules
 * 
 * @param {Array<string>} update - An array of page IDs representing the order of pages
 * @param {Array<Object>} rules - An array of rule objects defining the required ordering
 * @returns {Array<string>} - The correctly ordered pages
 */
function topologicalSort(update, rules) {

   // Create a copy of the update array
   let ordered = [...update];

   // Flag to check if the sorting is complete
   let isSorted = false;

   // Continue sorting until the order is correct according to the rules
   while (!isSorted) {

      // Assume it's sorted unless we find a violation
      isSorted = true;

      // Iterate through each rule to check the order of the pages
      for (const rule of rules) {

         // Page ID that must come before
         const before = rule.before;

         // Page ID that must come after
         const after = rule.after;

         // Only proceed if both pages exist in the current order
         const beforeIndex = ordered.indexOf(before);
         const afterIndex = ordered.indexOf(after);

         // If both before and after pages are present in the ordered array
         if (beforeIndex !== -1 && afterIndex !== -1) {

            // If the order is incorrect
            if (beforeIndex > afterIndex) {

               // Swap the two pages to correct the order
               [ordered[beforeIndex], ordered[afterIndex]] = [ordered[afterIndex], ordered[beforeIndex]];

               // Set sorted to false, we need another pass
               isSorted = false;

            };

         };

      };

   };

   // Return the correctly ordered pages
   return ordered;

};

/**
 * Description: Main function to process input of rules and updates, checking the validity of the updates based on the rules and calculating the total of middle page IDs that are valid
 * 
 * @param {string} rulesInput - A multiline string input defining the ordering rules between page IDs
 * @param {string} updatesInput - A multiline string input defining the updates with page IDs
 * @returns {number} - The total sum of the middle page IDs that were correctly ordered based on the rules
 */
function processUpdates(rulesInput, updatesInput) {

   // Process the input rules into an array of arrays of numbers.
   const rulesArray = rulesInput.trim().split('\n').map(line => line.split('|').map(Number));

   console.log('rulesArray:', rulesArray);

   // Convert rules into structured objects
   const rules = parseRules(rulesArray);

   console.log('rules:', rules);

   // Process the updates into a structured format
   const updates = updatesInput.trim().split('\n').map(line => line.split(',').map(Number));

   console.log('updates', updates);

   // Initialize a total counter for the middle page IDs
   let total = 0;

   let incorrectUpdates = [];

   // Iterate through each update to check its validity against rules
   updates.forEach((update) => {

      // Check if update is correctly ordered
      if (isCorrectlyOrdered(update, rules)) {

         console.log(`%c${getMiddlePage(update)}`, 'color:black; background-color:aquamarine;padding:5px; font-size:15px');

         // Add middle page ID to total
         total += getMiddlePage(update);

      } else if (!isCorrectlyOrdered(update, rules)) {

         incorrectUpdates.push(update);

         console.log(`%c${getMiddlePage(update)}`, 'color:white; background-color:brown;padding:5px; font-size:15px');

      };

   });

   // Display the result in the output div
   outputDiv.innerText = `Part 1 - Total sum of correct middle pages: ${total}`;

   console.log(`%cincorrectUpdates`, 'color:black; background-color:cyan;padding:20px; font-size:20px');
   console.log('incorrectUpdates', incorrectUpdates);

   // Initialize a counter for the total of middle pages in corrected updates
   let totalIncorrect = 0;

   incorrectUpdates.forEach(update => {

      console.log('incorrectedOrder', update);

      // Correct the order of each incorrect update based on the required rules
      const correctedOrder = topologicalSort(update, rules);

      console.log('correctedOrder', correctedOrder);

      // Get the middle page from the corrected order
      const middlePage = getMiddlePage(correctedOrder);

      console.log('middlePage', middlePage);

      // Accumulate the total of middle pages
      totalIncorrect += Number(middlePage);

   });

   // Display the result of corrected updates in the output div
   outputDiv2.innerText = `Part 2 - Total sum of corrected middle pages: ${totalIncorrect}`;

   // Return the total sum of middle page IDs from both correctly and incorrectly ordered updates
   return [total, totalIncorrect];

};