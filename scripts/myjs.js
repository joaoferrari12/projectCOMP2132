document.addEventListener("DOMContentLoaded", () => {
    const words = [
      { word: "javascript", hint: "Programming language" },
      { word: "hangman", hint: "Classic word-guessing game" },
      { word: "browser", hint: "Tool for accessing the internet" },
    ];
  
    const maxGuesses = 7;
    let selectedWord, hint, guessedLetters, incorrectGuesses;
  
    const hintEl = document.getElementById("hint");
    const wordDisplayEl = document.getElementById("word-display");
    const guessInput = document.getElementById("guess-input");
    const submitGuessBtn = document.getElementById("submit-guess");
    const hangmanGraphic = document.getElementById("game-stage");
    const resultsEl = document.getElementById("game-results");
    const playAgainBtn = document.getElementById("play-again");

    const filler = document.getElementById("filler")
  
    const initGame = () => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      selectedWord = randomWord.word;
      hint = randomWord.hint;
      guessedLetters = [];
      incorrectGuesses = 0;
      slideNumber = 2;
  
      hintEl.textContent = `Hint: ${hint}`;
      wordDisplayEl.textContent = "_ ".repeat(selectedWord.length).trim();
      hangmanGraphic.src = "images/SpacePics/Slide2.JPG";
      resultsEl.classList.add("hidden");
      playAgainBtn.classList.add("hidden");
      filler.classList.remove("hidden");
      guessInput.disabled = false;
      submitGuessBtn.disabled = false;
      guessInput.value = "";
    };
  
    const updateWordDisplay = () => {
      const display = selectedWord
        .split("")
        .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
      wordDisplayEl.textContent = display;
      return !display.includes("_");
    };
  
    const handleGuess = () => {
      const guess = guessInput.value.toLowerCase();
      guessInput.value = "";
  
      if (!guess || guessedLetters.includes(guess)) return;
  
      guessedLetters.push(guess);
  
      if (selectedWord.includes(guess)) {
        if (updateWordDisplay()) {
          resultsEl.textContent = "You Win!";
          resultsEl.classList.remove("hidden");
          hangmanGraphic.src = `images/SpacePics/Slide10.JPG`;
          endGame();
        }
      } else {
        incorrectGuesses++;
        slideNumber++;
        hangmanGraphic.src = `images/SpacePics/Slide${slideNumber}.JPG`;
        if (incorrectGuesses >= maxGuesses) {
          resultsEl.textContent = `Game Over. The word was "${selectedWord}"`;
          resultsEl.classList.remove("hidden");
          endGame();
          hangmanGraphic.src = `images/SpacePics/Slide9.JPG`;
        }
      }
    };
  
    const endGame = () => {
      guessInput.disabled = true;
      submitGuessBtn.disabled = true;
      playAgainBtn.classList.remove("hidden");
      filler.classList.add("hidden")
    };
  
    submitGuessBtn.addEventListener("click", handleGuess);
    playAgainBtn.addEventListener("click", initGame);
  
    initGame();
  });
  