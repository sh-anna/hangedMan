var objGame = {
  //DOM
  pgHint: document.getElementById("hint"),
  pgSolution: document.getElementById("solution"),
  pglettersUsed: document.getElementById("lettersUsed"),
  pgguessRemain: document.getElementById("guessesRemaining"),
  pgWins: document.getElementById("wins"),
  pgLosses: document.getElementById("losses"),
  hangerImg: document.getElementById("hanger"),
  invisImg: document.getElementById("invisImg"),
  // valid input characaters
  alphabet: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
  // words to solve
  word: [
    "cinderella",
    "twilight",
    "gladiator"
  ],
  // hints
  hint: [
    "don't be out past midnight",
    "sparkly vampires hate warewolves",
    "don't feed me to the lions"
    
  ],
  // guessed letters
  lettersGuessed: [],
  // current word
  currWord: [],
  // current hint
  currHint: "",
  //guess count
  guessCount: 10,
  // current answer
  currAnswer: "",
  // random
  rnd: 0,
  // user guess
  userGuess: "",
  // correct word
  correctWord: [],
  //wins/losses
  wins: 1,
  losses: 1,
  wordStart: "",

  // end game actions
  checkGameOver: function () {
    // if out of guesses
    if (this.guessCount == 0) {
      // loop to current word length
      for (var i = 0; i < this.currWord.length; i++) {
        // split solution letters to divs on stage
        this.pgSolution.children[i].innerHTML = this.currWord[i];
      }
      // display game over banner
      this.invisImg.src = "assets/img/game-over.png";
      this.invisImg.style.visibility = "visible";
      // update losses counter
      this.pgLosses.innerHTML = "losses: " + this.losses++;
    }
    // else user got all letters
    else if (this.correctWord.length == this.currWord.length) {
      // display not guilty banner
      this.invisImg.src = "assets/img/notfguilty.png";
      this.invisImg.style.visibility = "visible";
      //update wins counter
      this.pgWins.innerHTML = "wins: " + this.wins++;
    }
  },

  //play again
  resetVars: function () {
    this.lettersGuessed = [];
    this.currWord = [];
    this.currHint = "";
    this.guessCount = 10;
    this.currAnswer = "";
    this.rnd = 0;
    this.userGuess = "";
    this.correctWord = [];
    this.pglettersUsed.textContent = "";
    this.pgguessRemain.textContent = this.guessCount;
  },

  gamePlay: function () {
    //error check: user has guesses remaining and hasn't solved word
    if (this.guessCount > 0 && this.correctWord.length < this.currWord.length) {
      // get user input/set to lower case
      this.userGuess = event.key.toLowerCase();
      // error check: valid key input
      if (this.alphabet.indexOf(this.userGuess) > -1) {
        // check lettersGuessed array to see if letter has been guessed already
        if (this.lettersGuessed.indexOf(this.userGuess) > -1) {
          alert("You already guessed " + this.userGuess + "!");
        } else {
          // push user guess to letters guessed array
          this.lettersGuessed.push(this.userGuess);
          // if guess not correct
          if (this.currWord.indexOf(this.userGuess) < 0) {
            //decrement guessCount
            this.guessCount--;
            //change hanging image
            this.hangerImg.src = "assets/img/man" + this.guessCount + ".png";
            // write remaining guess number to page
            this.pgguessRemain.innerHTML = this.guessCount;
          }
          // else guess correct
          else {
            for (var i = 0; i < this.currWord.length; i++) {
              if (this.userGuess == this.currWord[i]) {
                this.pgSolution.children[i].innerHTML = this.userGuess;
                this.correctWord.splice(i, 0, this.userGuess);
              }
            }
          }
        }
        // used letter
        this.pglettersUsed.innerHTML = this.lettersGuessed;
        // check game over status
        this.checkGameOver();
      }
    }
  },

  // set up game
  drawSolution: function () {
    this.resetVars();
    // clear previous words on board if any
    while (this.pgSolution.hasChildNodes()) {
      this.pgSolution.removeChild(this.pgSolution.lastChild);
    }
    // set win/lose banner to hidden
    this.invisImg.style.visibility = "hidden";
    // reset hanger image
    hanger.src = "assets/img/man6.png";
    // get random word from word array
    if (this.word.length > 0) {
      this.rnd = Math.floor(Math.random() * this.word.length);
      this.currWord = this.word[this.rnd];
      this.currHint = this.hint[this.rnd];
    } else {
      alert(
        "Round Over!  You guessed " +
          this.wins +
          "out of " +
          this.wordStart +
          " correctly"
      );
    }

    // split currWord into new DOM element for each lettersGuessed
    for (var i = 0; i < this.currWord.length; i++) {
      var newDiv = document.createElement("div"); // create DIV for letter
      this.pgSolution.appendChild(newDiv); // append new div to solution div
      newDiv.setAttribute("class", "domLetter");
      var dummyData = this.pgSolution.getElementsByClassName("domLetter")[i]; //this element is target
      dummyData.innerHTML = "*"; // initial fill data (asterisk)
    }
  },
};

// set the stage
document.load = objGame.drawSolution();
objGame.wordStart = objGame.word.length;
document.onkeyup = function (event) {
  objGame.gamePlay();
};
