'use strict';

// Declaring state variables
let scores, currentScore, activePlayer, isPlaying;

// Selecting the elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const status0 = document.getElementById('status--0');
const status1 = document.getElementById('status--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');

const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

// Setting initial conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  status0.textContent = '';
  status1.textContent = '';

  dice.classList.add('hidden');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

const switchPlayer = function () {
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
};

init();

rollDiceBtn.addEventListener('click', function () {
  if (isPlaying) {
    let diceValue = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${diceValue}.png`;
    dice.classList.remove('hidden');

    if (diceValue !== 1) {
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      dice.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

      if (scores[0] === scores[1]) {
        status0.textContent = 'Nobody wins';
        status1.textContent = 'Nobody wins';
      } else {
        document.getElementById(`status--${activePlayer}`).textContent = 'win';
        document.getElementById(`status--${1 - activePlayer}`).textContent = 'lost';
      }
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
