var words = ['madonna', 'michael jackson', 'george michael',
              'queen', 'prince', 'whitney houston', 'wham',
              'cyndi lauper', 'annie lennox', 'phil collins',
              'ac dc', 'bee gees', 'pink floyd', 'dire straits',
              'scorpions', 'tina turner', 'david bowie'
            ];
var tryRemains = 10;
var userKeyEntered = "";
var chosenWord = "";
var triedLetters = "";


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
        // If the letter is in the word, change _ into the letter.
        // To Do:
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
        }
    }
}

// Since we are not using jquery here. . .
document.addEventListener("DOMContentLoaded", function(event) {
    // Randomize word chosen.
    chosenWord = words[ Math.floor(Math.random() * words.length) ] ;
    guessword.textContent = '';
    console.log("Word Chosen is " + chosenWord);

    for (var index = 0; index < chosenWord.length; index++) {
        if (chosenWord[index] !== ' ') {
            guessword.textContent += '_ ';
        } else {
            // ToDo: How to put space instead of the ugly below.
            guessword.textContent += '(space)';
        }
    }

    retries.textContent = tryRemains;
});
