'use strict';

// Selecting elements
const player0EL = document.querySelector(`.player--0`);
const player1EL = document.querySelector(`.player--1`);
const score0EL = document.getElementById(`score--0`);
const score1EL = document.getElementById(`score--1`);
const currentScore0EL = document.getElementById(`current--0`);
const currentScore1EL = document.getElementById(`current--1`);

const active = document.getElementById(`player--active`);

const diceEL = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// Starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add(`hidden`);

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle(`player--active`);
  player1EL.classList.toggle(`player--active`);
};

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generating random  dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. display dice
    diceEL.classList.remove(`hidden`);
    diceEL.src = `dice-${dice}.png`;
    // 3. check for rolled 1 :
    if (dice !== 1) {
      // Add dice to current score
      currentScore1EL.textContent = 0;
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // currentScore0EL.textContent = currentScore; // Change later
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    //   scores[1] = scores [1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, function () {
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  diceEL.classList.add(`hidden`);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--active`);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
});
