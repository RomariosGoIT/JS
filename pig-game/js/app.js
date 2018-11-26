/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

const gameItems = {
  scores: [0, 0],
  roundScore: 0,
  activePlayer: 0,
  gamePlaying: true,
  diceRoll: [0, 0],
  finalScore: {
    isActive: false,
    value: 100,
  },
};

const fistDice = document.querySelector('.dice-0');
const secondDice = document.querySelector('.dice-1');
const rollButton = document.querySelector('.btn-roll');
const holdButton = document.querySelector('.btn-hold');
const newGameButton = document.querySelector('.btn-new');
const form = document.querySelector('.inp-score');
const inp = document.getElementById('inp');
const finalScore = document.querySelector('.final-score');
const onStartModal = document.querySelector('.on-start-app');
const onRollOneModal = document.querySelector('.on-roll-one');
const onRollSixModal = document.querySelector('.on-roll-six');
const modalStartBtn = document.querySelector('.modal-btn-start');
const modalBtnOne = document.querySelector('.modal-btn-one');
const modalBtnSix = document.querySelector('.modal-btn-six');

newGameStart();

rollButton.addEventListener('click', rollBtnHandler);
holdButton.addEventListener('click', holdBtnHandler);
newGameButton.addEventListener('click', newGameBtnHandler);
form.addEventListener('submit', setFinalScoreHanler);

function setFinalScoreHanler(evt) {
  evt.preventDefault();
  if (!gameItems.finalScore.isActive) {
    if (!isNaN(inp.value) && inp.value !== '') {
      console.log(inp.value);
      gameItems.finalScore.value = inp.value;
      finalScore.textContent = gameItems.finalScore.value;
      inp.value = null;
      form.classList.remove('error');
      finalScore.classList.remove('not-set');
    } else {
      form.classList.add('error');
    }
  }
}

function rollBtnHandler() {
  if (gameItems.gamePlaying && gameItems.finalScore.value !== false) {
    let randomOne = Math.floor(Math.random() * 6) + 1;
    let randomTwo = Math.floor(Math.random() * 6) + 1;
    fistDice.style.display = 'block';
    secondDice.style.display = 'block';
    fistDice.src = './img/dice-' + randomOne + '.png';
    secondDice.src = './img/dice-' + randomTwo + '.png';
    gameItems.finalScore.isActive = true;
    inp.disabled = true;
    gameItems.diceRoll[0] = randomOne;
    gameItems.diceRoll[1] = randomTwo;
    form.classList.add('hide');
    if (
      randomOne === 6 &&
      gameItems.diceRoll[0] === 6 &&
      (randomTwo === 6 && gameItems.diceRoll[1] === 6)
    ) {
      document.getElementById('score-' + gameItems.activePlayer).textContent =
        '0';
      gameItems.scores[gameItems.activePlayer] = 0;
      nextPlayer();
      onRollSixModal.classList.remove('hide');
    } else if (randomOne !== 1 && randomTwo !== 1) {
      gameItems.roundScore += randomOne + randomTwo;
      document.getElementById('current-' + gameItems.activePlayer).textContent =
        gameItems.roundScore;
    } else {
      onRollOneModal.classList.remove('hide');
      nextPlayer();
    }
  }
}

function holdBtnHandler() {
  if (gameItems.gamePlaying && gameItems.finalScore.isActive !== false) {
    let playerScore = (gameItems.scores[gameItems.activePlayer] +=
      gameItems.roundScore);
    document.getElementById(
      'score-' + gameItems.activePlayer,
    ).textContent = playerScore;
    gameItems.scores[gameItems.activePlayer] >= gameItems.finalScore.value
      ? winnerHandler()
      : nextPlayer();
  }
}

function newGameBtnHandler() {
  newGameStart();
}

function winnerHandler() {
  document
    .querySelector('.player-' + gameItems.activePlayer + '-panel')
    .classList.add('winner');
  document
    .querySelector('.player-' + gameItems.activePlayer + '-panel')
    .classList.remove('active');
  document.getElementById('name-' + gameItems.activePlayer).textContent =
    'Winner!';
  fistDice.style.display = 'none';
  secondDice.style.display = 'none';
  gameItems.gamePlaying = false;
}

function nextPlayer() {
  document.getElementById('current-' + gameItems.activePlayer).textContent = 0;
  gameItems.roundScore = 0;
  gameItems.diceRoll = [0, 0];
  fistDice.style.display = 'none';
  secondDice.style.display = 'none';
  gameItems.activePlayer === 0
    ? (gameItems.activePlayer = 1)
    : (gameItems.activePlayer = 0);
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function newGameStart() {
  finalScore.textContent = gameItems.finalScore.value;
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  gameItems.scores = [0, 0];
  gameItems.roundScore = 0;
  gameItems.activePlayer = 0;
  gameItems.diceRoll = [0, 0];
  fistDice.style.display = 'none';
  secondDice.style.display = 'none';
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  gameItems.gamePlaying = true;
  gameItems.finalScore.isActive = false;
  inp.disabled = false;
  form.classList.remove('hide');
  if (!gameItems.finalScore.value) {
    finalScore.classList.add('not-set');
    finalScore.textContent = 'Set final score';
  }
}

modalBtnOne.addEventListener('click', () => {
  onRollOneModal.classList.add('hide');
});

modalBtnSix.addEventListener('click', () => {
  onRollSixModal.classList.add('hide');
});

modalStartBtn.addEventListener('click', () => {
  onStartModal.classList.add('hide');
});
