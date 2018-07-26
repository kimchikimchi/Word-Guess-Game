var words = ['madonna', 'michael jackson', 'george michael',
              'queen', 'prince', 'whitney houston', 'wham',
              'cyndi lauper', 'annie lennox', 'phil collins',
              'ac dc', 'bee gees', 'pink floyd', 'dire straits',
              'scorpions', 'tina turner', 'david bowie'
            ];
var tryRemains;             // Number of guesses remaining.
var userKeyEntered;         // Letter user enters
var chosenWord;             // computer selects this randomly from list above.
var triedLetters;           // collect failed, tried letters.
var matchedLetterIndices;   // stores array indices of correctly guessed ones.


/*
    Helper function.

    Draw user displayed blanks. For any known letters, draw them.
    Otherwise, leave them as _

    Function is called first when page loaded then every time key is pressed.
*/

function resetGame() {
    tryRemains = 10;
    userKeyEntered = "";
    chosenWord = "";
    triedLetters = "";
    matchedLetterIndices = [];

    chosenWord = words[ Math.floor(Math.random() * words.length) ];
    console.log("Word Chosen is " + chosenWord);
    retries.textContent = tryRemains;
    guessed_letters.textContent = '';
}

function drawGuessword () {
    guessword.textContent = '';
    // Redraw to null.  Otherwise, it will concatenate to the last call

    for (var index = 0; index < chosenWord.length; index++) {
        if (chosenWord[index] !== ' ') {
            if ( matchedLetterIndices.includes(index) ) {
                guessword.textContent += chosenWord[index] + ' ';
            } else {
                guessword.textContent += '_ ';
            }

        } else {
            // ****** ToDo: How to put space instead of the ugly below. *******
            guessword.textContent += '-';
        }
    }
}

function matchLetters(char) {
    var index = 0;
    var matchedIndex = 0;

    // The following returns the index of matching letter.
    // Returns -1 if it exhausts the sample.
    while (matchedIndex !== -1) {
        matchedIndex = chosenWord.indexOf(char, index);

        if (matchedIndex !== -1) {
            matchedLetterIndices.push(matchedIndex);
        }
        index = matchedIndex + 1;
    }
}


function checkGameOver() {
    //// When there are no more _ in the display, game is over.
    if (! guessword.textContent.match('_') ) {
        alert("\t\t\t\t\t\tYou won!");
        resetGame();
        drawGuessword();
        return;
    }

    // If retries are exhausted, game over.
    if (tryRemains === 0) {
        alert("\t\t\t\t\t\tGAME OVER");
        resetGame();
        drawGuessword();
    }
}

function drawWrongGuess(char) {
    // If the letter is not, lower the retries by one and add to the guessed letter list
        guessed_letters.textContent += char + " ";
        triedLetters += char;

        tryRemains--;
        retries.textContent = tryRemains;
}

// Handle event after each key is pressed
document.onkeyup = function(event) {
    var keyEntered = event.key.toLowerCase();
    console.debug("You pressed : " + keyEntered);

    // No op if entered key is non-alphabet char
    if (! keyEntered.match(/^[a-z]$/)) {
        console.debug("You pressed an non-alphabet char");
        return;
    }

    // check the entered letter against the randomly selected word
    if (chosenWord.match(keyEntered)) {
        console.debug("Matched");
        matchLetters(keyEntered);

        console.debug(matchedLetterIndices);
        drawGuessword();
    } else {
        // If character is already entered, don't count it torward retries.
        if (triedLetters.match(keyEntered)) {
            console.debug("Already entered key: " + keyEntered);
        } else {
            drawWrongGuess(keyEntered);
        }
    }

    checkGameOver();
}

// Since we are not using jquery here. . .
document.addEventListener("DOMContentLoaded", function(event) {
    // Randomize word chosen.
    /*
    chosenWord = words[ Math.floor(Math.random() * words.length) ];
    console.log("Word Chosen is " + chosenWord);
    retries.textContent = tryRemains;
    */
    resetGame();
    drawGuessword();
});
