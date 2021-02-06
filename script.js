'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const imgDice = document.querySelector('.dice');

let playing, currentPlayer, currentScore, scores;

const init = function () {
  playing = true;
  scores = [0, 0];
  currentPlayer = 0;
  currentScore = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  imgDice.classList.add('hidden');
  player0.classList.add('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--active', 'player--winner');
};

const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  currentScore = 0;
  currentPlayer = currentPlayer == 0 ? 1 : 0;
};

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    imgDice.classList.remove('hidden');
    imgDice.src = `dice-${diceNumber}.png`;

    if (diceNumber != 1) {
      currentScore += diceNumber;
      document.getElementById(
        `current--${currentPlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    if (scores[currentPlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
