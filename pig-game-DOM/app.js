/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// ========== VARIABLES ===

var scores, roundScores, activePlayer, gamePlaying;
init();

// ========== EVENTS ===

// ----- Roll Button -----

document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1. Random number
    dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. Update the round score if the rolled number was NOT 1
    if (dice !== 1) {
      // add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // next player
      nextPlayer();
    }
  }
});

// ----- Hold Button -----

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // next player
      nextPlayer();
    }
  }
});

// ========== NEXT PLAYER ===

function nextPlayer() {
  // change active player and set round score back to 0
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // set back round score to 0 in UI
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // change active class
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // hide dice
  document.querySelector(".dice").style.display = "none";
}

// ========== NEW GAME ===

document.querySelector(".btn-new").addEventListener("click", init);

// ========== INIT ===

function init() {
  // set back scores to 0
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // hide dice
  document.querySelector(".dice").style.display = "none";

  // setting back UI
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

/* *******************
 * 'innerHTML' need a string, 'textContent' need a text(not html)
 * Setter (set a value)
 * Getter (read a value)
 ********* */
