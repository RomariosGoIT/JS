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
  diceRoll: 0,
  finalScore: {
    isActive: false,
    value: null,
  },
};

const diceRoll = document.querySelector('.dice');
const rollButton = document.querySelector('.btn-roll');
const holdButton = document.querySelector('.btn-hold');
const newGameButton = document.querySelector('.btn-new');
const inpButton = document.querySelector('.inp-score');
const inp = document.getElementById('inp');
const finalScore = document.querySelector('.final-score');

newGameStart();

rollButton.addEventListener('click', rollBtnHandler);
holdButton.addEventListener('click', holdBtnHandler);
newGameButton.addEventListener('click', newGameBtnHandler);
inpButton.addEventListener('submit', setFinalScoreHanler);

function setFinalScoreHanler(evt) {
  evt.preventDefault();
  if (!gameItems.finalScore.isActive) {
    if (!isNaN(inp.value)) {
      gameItems.finalScore.value = inp.value;
      finalScore.textContent = gameItems.finalScore.value;
      inp.value = null;
      gameItems.finalScore.isActive = true;
      inp.disabled = true;
      inpButton.classList.remove('error');
    } else {
      inpButton.classList.add('error');
    }
  }
}

function rollBtnHandler() {
  if (gameItems.gamePlaying && gameItems.finalScore.value !== null) {
    let random = Math.floor(Math.random() * 6) + 1;
    diceRoll.style.display = 'block';
    diceRoll.src = './img/dice-' + random + '.png';
    random === 6 ? (gameItems.diceRoll += 6) : null;
    gameItems.finalScore.isActive = true;
    inp.disabled = true;
    if (random !== 1 && gameItems.diceRoll !== 12) {
      gameItems.roundScore += random;
      document.getElementById('current-' + gameItems.activePlayer).textContent =
        gameItems.roundScore;
    } else {
      nextPlayer();
    }
  }
}

function holdBtnHandler() {
  if (gameItems.gamePlaying && gameItems.finalScore.value !== null) {
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
  diceRoll.style.display = 'none';
  gameItems.gamePlaying = false;
}

function nextPlayer() {
  document.getElementById('current-' + gameItems.activePlayer).textContent = 0;
  gameItems.roundScore = 0;
  gameItems.diceRoll = 0;
  diceRoll.style.display = 'none';
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
  gameItems.diceRoll = 0;
  diceRoll.style.display = 'none';
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  gameItems.gamePlaying = true;
  gameItems.finalScore.isActive = false;
  inp.disabled = false;
}
