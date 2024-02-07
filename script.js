
var currentWord;
var currentHint;
var totalTries = 0
document.getElementById("try").innerText = totalTries
document.getElementById("hangman").setAttribute("src", `assets/hangman-${totalTries}.svg`)
var wordToShow = "";
var words = [
    { word: "banana", hint: "A yellow fruit often found in bunches." },
    { word: "elephant", hint: "A large mammal with a long trunk and tusks." },
    { word: "computer", hint: "A device used for processing data." },
    { word: "guitar", hint: "A musical instrument with strings." },
    { word: "mountain", hint: "A large natural elevation of the earth's surface." }
];

function fetchWord() {
    var indexOfWord = Math.floor(Math.random() * words.length);
    currentWord = words[indexOfWord].word;
    currentHint = words[indexOfWord].hint;
    document.getElementById("hint").innerHTML = currentHint;

    for (i = 0; i < currentWord.length; i++) {
        wordToShow += "_ ";
    }
    document.getElementById("word").innerHTML = wordToShow;
}

function checkLetter(letter) {
    var letterFound = false;
    var newWordToShow = "";
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i].toUpperCase() === letter.toUpperCase()) {
            newWordToShow += letter + " ";
            letterFound = true;
        } else {
            newWordToShow += wordToShow[i * 2] + " ";
        }
    }
    if (!letterFound) {
        totalTries = totalTries + 1
        document.getElementById("try").innerText = totalTries
        document.getElementById("hangman").setAttribute("src", `assets/hangman-${totalTries}.svg`)
    }
    wordToShow = newWordToShow;
    document.getElementById("word").innerHTML = wordToShow;
    var buttonId = "btn_" + letter.toUpperCase();
    document.getElementById(buttonId).disabled = true;
    if (totalTries != 6) {
        if (!wordToShow.includes("_")) {
            alert("Congratulations! You've guessed the word correctly: " + currentWord);
        }
    } else {
        alert("Out Of tries")
    }
}
function createLetterButtons() {
    var lettersDiv = document.getElementById("letters");
    for (var i = 65; i <= 90; i++) {
        var letter = String.fromCharCode(i);
        var button = document.createElement("button");
        button.textContent = letter;
        button.setAttribute("id", "btn_" + letter);
        button.setAttribute("onclick", "checkLetter('" + letter + "')");
        lettersDiv.appendChild(button);
    }
}

fetchWord();
createLetterButtons();
