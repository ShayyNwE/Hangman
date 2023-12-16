const wordList = ["Nuno", "Zakariya", "Koman", "Aurelien", "Rayane", "Sonia", "Youness", "Iyad", "Ilias", "Tom", "Mattéo", "Ihsane", "Romain", "Antoine"];
var randomWord;
var wrongGuess = 0;
var rightGuess = 0;
const maxWrongGuess = 6;
const guessedLetters = [];
var gameWon = false;
var gameLost = false;
const hangmanImage = $("#hangman-image");
var winSound = document.createElement('audio');
var loseSound = document.createElement('audio');
$(winSound).attr("src", "../Tom_JULLIAT_EXAM/sounds/win.mp3");
$(loseSound).attr("src", "../Tom_JULLIAT_EXAM/sounds/loss.mp3");

function chooseRandomWord() {
    const randomNumber = Math.floor(Math.random() * wordList.length);
    randomWord = wordList[randomNumber];
    for (let i = 0; i < randomWord.length; i++) {
        $("#word_container").append(`<div class="letter_container" id="letter_${[i]}"> _ </div>`);
    }
}

function showAlert(message) {
    alert(message);
}

function drawHangman(index) {
    if (wrongGuess > index) {
        hangmanImage.attr("src", `../Tom_JULLIAT_EXAM/images/image0${index + 1}.png`);
        hangmanImage.show();
    }
}

function checkGameStatus() {
    if (rightGuess === randomWord.length) {
        showAlert("Congratulations! You've won!");
        gameWon = true;
        winSound.play();
    } else if (wrongGuess === maxWrongGuess) {
        for (let i = 0; i < randomWord.length; i++) {
            $(`#letter_${i}`).text(randomWord[i]);
        }
        showAlert(`Sorry, you've lost. The correct word was: ${randomWord}`);
        gameLost = true;
        loseSound.play();
    }
}

function handleGuess(userInput) {
    if (guessedLetters.includes(userInput)) {
        showAlert(`You've already guessed the letter '${userInput}'. Try another one.`);
        return;
    }

    guessedLetters.push(userInput);

    let letterFound = false;
    for (let i = 0; i < randomWord.length; i++) {
        if (cleanInput(randomWord[i]) === cleanInput(userInput)) {
            $(`#letter_${i}`).text(randomWord[i]);
            rightGuess++;
            letterFound = true;
        }
    }

    if (!letterFound) {
        wrongGuess++;
        $("#guesses").text(`Wrong guess : ${wrongGuess}`);
        drawHangman(wrongGuess - 1);
    }

    checkGameStatus();
}

winSound.addEventListener('canplaythrough', function() {
    console.log('Win sound loaded successfully');
});

loseSound.addEventListener('canplaythrough', function() {
    console.log('Lose sound loaded successfully');
});

function cleanInput(input) {
    return input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

$(window).on("keydown", function (event) {
    if (!gameWon && !gameLost) {
        const userInput = event.key.toUpperCase();
        handleGuess(userInput);
    } else {
        showAlert("The game is over. Please refresh the page to play again.");
    }
});

chooseRandomWord();
