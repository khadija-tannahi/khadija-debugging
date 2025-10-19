 
 // Debugging Exercise

 // the 8 bugs are fixed in this file are: 
 
  //Bug #1: Wrong message displayed. fixed line : tooHighMessage.style.display = ''; 
  //Bug #2: Max attempts condition not working because (==== should be ===). fixed line : if (attempts === maxNumberOfAttempts) {  
  //Bug #3: Max attempts message not shown. fixed lines 100: added line to show  maxGuessesMessage 
  //Bug #4: Typo in for loop condition (<= should be <). fixed line : for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
  //Bug #5: Typo in function declaration (funtion should be function). fixed line : function setup() {
  //Bug #6: attempts not reset at game start (maxNumberOfAttempts should be attempts). fixed line : attempts = 0;
  //Bug #7: Typo in property name (disabeld should be disabled). fixed line : submitButton.disabled = false;
  //Bug #8: Missing lines to show and set innerHTML of maxGuessesMessage when max attempts reached. fixed line : added line to show and set innerHTML of maxGuessesMessage 

  
 // STRETCH GOALS ADDED:
 // Stretch Goal #1: Prevent numbers below 1 - Added validation in checkGuess to reject guesses < 1
 // Stretch Goal #2: Prevent numbers above 99 - Added validation in checkGuess to reject guesses > 99
 // Stretch Goal #3: Singular "guess" vs plural "guesses" - Modified the remaining guesses message to use singular when only 1 left



// Get references to page elements
const guessInput = document.getElementById('guess'); // Input element
const submitButton = document.getElementById('submit'); // Button element
const resetButton = document.getElementById('reset'); // The button to restart the game
const messages = document.getElementsByClassName('message'); // All message elements
const tooHighMessage = document.getElementById('too-high'); // Message for guess too high
const tooLowMessage = document.getElementById('too-low'); // Message for guess too low
const maxGuessesMessage = document.getElementById('max-guesses'); // Message for max guesses reached
const numberOfGuessesMessage = document.getElementById('number-of-guesses'); // Message for number of guesses made
const correctMessage = document.getElementById('correct'); // Message for correct guess


// These variables will keep track of the game's state.
let targetNumber;
// Number of attempts made
let attempts = 0;
// Maximum number of guesses allowed
const maxNumberOfAttempts = 5;  

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Check the user's guess
//this function is called when the user clicks the submit button
function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  // Stretch Goal #1 & #2: Prevent submitting guessed numbers lower than 1 or higher than 99
  // Added validation to check if the guess is within the valid range (1-99) before proceeding.
  // This prevents invalid inputs from being processed, maintaining game integrity and avoiding unexpected behavior.
  if (guess < 1 || guess > 99 || isNaN(guess)) {
    // Show an invalid guess message (assuming a new message element 'invalid-guess' exists in HTML)
    // If not, this could be adapted to use an existing message or alert.
    const invalidMessage = document.getElementById('invalid-guess');
    if (invalidMessage) {
      invalidMessage.style.display = '';
      invalidMessage.innerHTML = 'Please enter a number between 1 and 99.';
    }
    // Clear the input box
    guessInput.value = '';
    return; // Exit early without incrementing attempts or checking further
  }

  attempts = attempts + 1; // Increment number of attempts

  // Hide all messages
  hideAllMessages();

  // Check if the guess is correct, too high, or too low
  //case1: correct guess
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = ''; // Show the number of guesses message
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    
    // Show the correct message
    correctMessage.style.display = '';
    
    // Disable the input and submit button so the user can't keep guessing
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  //case2: incorrect guess
  if (guess !== targetNumber) {
    // chech if guess is too low or too high
    
    if (guess < targetNumber) {
      // Show the too low message
      tooLowMessage.style.display = '';
    } else {
      // fixed: Show the too high message
      tooHighMessage.style.display = '';  // ===> Bug here 1: should be tooHighMessage.style.display = '';
    }

    // calculate remaining attempts
    const remainingAttempts = maxNumberOfAttempts - attempts;

    // Stretch Goal #3: If there is only one guess left, it should say "guess" (singular) instead of "guesses" (plural)
    // Modified the message to use singular "guess" when remainingAttempts is 1, otherwise plural "guesses".
    // This improves user experience by providing grammatically correct feedback.
    const guessWord = remainingAttempts === 1 ? 'guess' : 'guesses';

    // Show the number of guesses message
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessWord} remaining`;
  }


  //case3: max number of attempts reached
  // Show the max guesses message
  //fixed: the typo in the if condition
  if (attempts === maxNumberOfAttempts) {  // ===> bug here 2: this line has a typo (==== should be ===)
    submitButton.disabled = true;
    guessInput.disabled = true;
     
    // ===> bug here 3: missing line to show the max guesses message
     // fixed: missing line to show the max guesses message
     maxGuessesMessage.style.display = '';

      // ===> bug here 8: missing line to set the innerHTML of the max guesses message
     // fixed: missing line to set the innerHTML of the max guesses message
     maxGuessesMessage.innerHTML = `You've run out of guesses! The number was ${targetNumber}.`;


  }
  

  // Clear the input box for the next guess
  guessInput.value = '';
  
  // Show the reset button so the user can play again
  resetButton.style.display = '';
}


// this function hides all the messages
function hideAllMessages() {

  // Loop through all message elements and hide them
  // ===> bug here 4: there is a bug in the for loop (<= should be <)
  //fixed: change (<= to <) in the for loop condition
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { // Bug here: (<= should be <)
    
    messages[elementIndex].style.display = 'none';
  }
}



// this function sets up the game
// ===> bug here 5: there is a typo in the function declaration (funtion should be function)
//fixed: typo in the function declaration
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  // For testing, log the target number
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  //maxNumberOfAttempts = 0; // ===> Bug here 6 : attempts should be reset, not maxNumberOfAttempts
  //fixed: reset the current attempts to 0
  attempts = 0;

  // Enable the input and submit button
  //fixed: typo in the property name
  submitButton.disabled = false; // ===> Bug here 7: disabeld should be disabled
  guessInput.disabled = false;
 

  // hide all messages at the start of the game
  hideAllMessages();
  // hide the reset button at the start of the game
  resetButton.style.display = 'none';
}

// Add event listeners to buttons
//when the user clicks the submit button, the checkGuess function is called
submitButton.addEventListener('click', checkGuess);

//when the user clicks the reset button, the setup function is called
resetButton.addEventListener('click', setup);



// Call the setup function to start the game
setup();
