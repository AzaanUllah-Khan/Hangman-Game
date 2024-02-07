
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
    { word: "mountain", hint: "A large natural elevation of the earth's surface." },
    { word: "chocolate", hint: "A sweet, brown food made from cacao beans." },
    { word: "astronaut", hint: "A person trained to travel in a spacecraft." },
    { word: "umbrella", hint: "A device used for protection from rain or sun." },
    { word: "library", hint: "A place where books and other materials are stored." },
    { word: "puzzle", hint: "A game or problem designed to test ingenuity or knowledge." },
    { word: "bicycle", hint: "A two-wheeled vehicle propelled by pedals." },
    { word: "sunflower", hint: "A tall plant with large yellow flowers." },
    { word: "fireplace", hint: "A structure used for containing a fire indoors." },
    { word: "octopus", hint: "A sea creature with eight arms." },
    { word: "telephone", hint: "A device used for transmitting sound over long distances." },
    { word: "volcano", hint: "A mountain or hill with a crater or vent where lava, rock fragments, hot vapor, and gas are being or have been erupted." },
    { word: "butterfly", hint: "An insect with large, often colorful wings." },
    { word: "treasure", hint: "Valuable objects or money hidden away." },
    { word: "rainbow", hint: "A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light in water droplets." },
    { word: "magician", hint: "A person who performs magic tricks for entertainment." },
    { word: "pineapple", hint: "A tropical fruit with a spiky outer shell." },
    { word: "butterfly", hint: "A colorful insect that flutters its wings." },
    { word: "television", hint: "An electronic device used for watching programs." },
    { word: "dragonfly", hint: "An insect with a long body and two pairs of large, transparent wings." },
    { word: "watermelon", hint: "A large fruit with a green rind and juicy red flesh." },
    { word: "astronomy", hint: "The scientific study of celestial objects and phenomena." },
    { word: "adventure", hint: "An exciting or unusual experience." },
    { word: "chameleon", hint: "A lizard capable of changing color to blend with its surroundings." },
    { word: "restaurant", hint: "A place where meals are served to customers." },
    { word: "superhero", hint: "A fictional character with extraordinary abilities, often used to fight evil." },
    { word: "friendship", hint: "A close relationship between two or more people." },
    { word: "oxygen", hint: "A gas that is essential for human respiration." },
    { word: "novel", hint: "A long fictional story, usually with a complex plot and characters." },
    { word: "equation", hint: "A mathematical statement that shows the equality of two expressions." },
    { word: "revolution", hint: "A sudden, complete change, such as the overthrow of a government." },
    { word: "ecosystem", hint: "A community of living organisms and their environment." },
    { word: "culture", hint: "The beliefs, customs, arts, etc., of a particular society, group, place, or time." },
    { word: "volunteer", hint: "A person who offers to do something without being forced or paid to do it." },
    { word: "democracy", hint: "A system of government where citizens have the power to choose their leaders." },
    { word: "gravity", hint: "The force that attracts objects toward the center of the Earth." },
    { word: "symphony", hint: "A long musical composition for orchestra, typically in four movements." },
    { word: "fossil", hint: "The preserved remains or traces of ancient organisms." },
    { word: "poetry", hint: "Literary work in which special intensity is given to the expression of feelings and ideas." },
    { word: "latitude", hint: "The distance north or south of the equator, measured in degrees." },
    { word: "puzzle", hint: "A game or problem designed to test ingenuity or knowledge." },
    { word: "planet", hint: "A large celestial body that orbits around a star." },
    { word: "dolphin", hint: "A highly intelligent marine mammal known for its playful behavior." },
    { word: "castle", hint: "A large fortified building, often with towers and moats." },
    { word: "robot", hint: "A machine capable of carrying out complex actions automatically." },
    { word: "rainbow", hint: "A colorful arc in the sky caused by the refraction and dispersion of light." },
    { word: "garden", hint: "An outdoor space used for growing plants, flowers, or vegetables." },
    { word: "music", hint: "An art form consisting of sound and silence organized in time." },
    { word: "butterfly", hint: "A beautiful insect with large, often colorful wings." },
    { word: "volcano", hint: "A mountain or hill with a crater or vent where lava, rock, and gases erupt." },
    { word: "ship", hint: "A large vessel used for traveling over water." },
    { word: "tree", hint: "A woody perennial plant, typically with a single stem or trunk." },
    { word: "book", hint: "A written or printed work consisting of pages bound together." },
    { word: "moon", hint: "A natural satellite that orbits a planet." },
    { word: "beach", hint: "A sandy or pebbly shore by the ocean or other body of water." },
    { word: "bicycle", hint: "A two-wheeled vehicle propelled by pedals." }
];

function fetchWord() {
    totalTries = 0
    wordToShow = "";
    document.getElementById("try").innerText = totalTries
    document.getElementById("hangman").setAttribute("src", `assets/hangman-${totalTries}.svg`)
    createLetterButtons();
    var indexOfWord = Math.floor(Math.random() * words.length);
    currentWord = words[indexOfWord].word;
    currentHint = words[indexOfWord].hint;
    document.getElementById("hint").innerHTML = "Hint: " +currentHint;

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

    setTimeout(() => {
        gameStatus()
    }, 500);
    var buttonId = "btn_" + letter.toUpperCase();
    document.getElementById(buttonId).disabled = true;
}
function gameStatus() {
    if (totalTries != 6) {
        if (!wordToShow.includes("_")) {
            Swal.fire(
                'Good job!',
                'You have guessed the correct word : ' + currentWord,
                'success'
            )
            fetchWord()
        }
    } else {
        Swal.fire(
            'Out Of Tries',
            'The correct word was : ' + currentWord,
            'error'
        ).then(() => {
            fetchWord()
        })
    }
}
function createLetterButtons() {
    var lettersDiv = document.getElementById("letters");
    lettersDiv.innerHTML = "";
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
