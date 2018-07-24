var words = ['madonna', 'michael jackson', 'george michael',
              'queen', 'prince', 'whitney houston', 'wham',
              'cyndi lauper', 'annie lennox', 'phil collins',
              'ac dc', 'bee gees', 'pink floyd', 'dire straits',
              'scorpions', 'tina turner', 'david bowie'
            ];
var tryRemains = 10;
var userKeyEntered = "";
var chosenWord = "";            // computer selects this randomly from list.
var triedLetters = "";          // collect failed, tried letters.
var matchedLetterIndices = [];


/*
    Helper function.

    Draw user displayed blanks. For any known letters, draw them.
    Otherwise, leave them as _

    Function is called first when page loaded then every time key is pressed.
*/

function drawGuessword () {
    // Redraw to null.  Otherwise, it will concatenate to the last call
    guessword.textContent = '';

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
        var index = 0;
        var matchedIndex = 0;

        console.debug("Matched");

        // The following returns the index of matching letter.
        // Returns -1 if it exhausts the sample.
        while (matchedIndex !== -1) {
            matchedIndex = chosenWord.indexOf(keyEntered, index);

            if (matchedIndex !== -1) {
                matchedLetterIndices.push(matchedIndex);
            }
            index = matchedIndex + 1;
        }

        console.debug(matchedLetterIndices);
        drawGuessword();

    } else {
        // If character is already entered, don't count it torward retries.
        if (triedLetters.match(keyEntered)) {
            console.debug("Already entered key: " + keyEntered);
        } else {
            
            // If the letter is not, lower the retries by one and add to the guessed letter list.
            guessed_letters.textContent += keyEntered + " ";
            triedLetters += keyEntered;

            tryRemains--;
            retries.textContent = tryRemains;

            // If retries are exhausted, game over.
            if (tryRemains === 0) {
                retries.textContent = "GAME OVER!";
            }
        }
    }
}

// Since we are not using jquery here. . .
document.addEventListener("DOMContentLoaded", function(event) {
    // Randomize word chosen.
    chosenWord = words[ Math.floor(Math.random() * words.length) ];
    console.log("Word Chosen is " + chosenWord);
    retries.textContent = tryRemains;

    drawGuessword();
});
