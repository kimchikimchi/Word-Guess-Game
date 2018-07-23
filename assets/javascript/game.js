var words = ['madonna', 'michael jackson', 'george michael',
              'queen', 'prince', 'whitney houston', 'wham',
              'cyndi lauper', 'annie lennox', 'phil collins',
              'ac dc', 'bee gees', 'pink floyd', 'dire straits',
              'scorpions', 'tina turner', 'david bowie'
            ];
var tryRemains = 10;
var userKeyEntered = "";
var chosenWord = "";

// Randomize word chosen.
chosenWord = words[ Math.floor(Math.random() * words.length) ] ;
console.log("Word Chosen is " + chosenWord);

// Handle event after each key is pressed
document.onkeyup = function(event) {



}
