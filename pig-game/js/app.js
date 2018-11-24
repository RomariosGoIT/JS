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
  activePlayers: 0
};

const diceRoll = document.querySelector('.dice');
const rollButton = document.querySelector('.btn-roll');
const holdButton = document.querySelector('.btn-hold');
const newGameButton = document.querySelector('.btn-new');

const startNewGame = () => {
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  gameItems.scores = [0, 0];
  gameItems.roundScore = 0;
  gameItems.activePlayers = 0;
  diceRoll.style.display = 'none';
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
};

startNewGame();

const zeroingHandler = () => {
  document.getElementById('current-' + gameItems.activePlayers).textContent = 0;
  gameItems.roundScore = 0;
  diceRoll.style.display = 'none';
  gameItems.activePlayers === 0 ? gameItems.activePlayers = 1 : gameItems.activePlayers = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
};

const rollBtnHandler = () => {  
  let random = Math.floor(Math.random() * 6) + 1;
  diceRoll.style.display = 'block';
  diceRoll.src = './img/dice-' + random + '.png';
  if(random !== 1) {
    gameItems.roundScore += random;
    document.getElementById('current-' + gameItems.activePlayers).textContent = gameItems.roundScore;
  } else {
    zeroingHandler();
  }
};

const holdBtnHandler = () => {    
    let playerScore = gameItems.scores[gameItems.activePlayers] += gameItems.roundScore;
    document.getElementById('score-' + gameItems.activePlayers).textContent = playerScore;
    zeroingHandler();
};

const newGameBtnHandler = () => {
  startNewGame();
  
};


rollButton.addEventListener('click', rollBtnHandler);
holdButton.addEventListener('click', holdBtnHandler);
newGameButton.addEventListener('click', newGameBtnHandler);

