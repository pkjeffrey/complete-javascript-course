/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

CHALLENGE 6:
Change your game to follow these rules:

- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
- Add an input field to the HTML where players can set the winning score, so that they can change the
predefined score of 100.
- Add another dice to the game, so that there are two dices now. The player losses his current score
when one of them is a 1.

*/

var gameEnded, prevDice, activePlayer, roundScore, playerScores;

function init() {
    gameEnded = false;
    prevDice = 0;
    activePlayer = 0;
    roundScore = 0;
    playerScores = [0, 0];
    document.getElementById('dice').style.display = 'none';
    document.getElementById('score-0').textContent = playerScores[0];
    document.getElementById('score-1').textContent = playerScores[1];
    document.getElementById('current-0').textContent = roundScore;
    document.getElementById('current-1').textContent = roundScore;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}
function updateScores() {
    document.getElementById('score-0').textContent = playerScores[0];
    document.getElementById('score-1').textContent = playerScores[1];
    document.getElementById('current-0').textContent = activePlayer == 0 ? roundScore : 0;
    document.getElementById('current-1').textContent = activePlayer == 1 ? roundScore : 0;
}
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}
function switchPlayer() {
    prevDice = 0;
    activePlayer = ++activePlayer % 2;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

init();

document.querySelector('.btn-new').addEventListener('click', function() {
    init();
    updateScores();
});

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameEnded) return;

    var value = rollDice();
    var dice = document.getElementById('dice');
    dice.style.display = 'block';
    dice.src = 'dice-' + value + '.png';

    if (value === 6 && prevDice === 6) {
        roundScore = 0;
        playerScores[activePlayer] = 0;
        switchPlayer();
    } else if (value !== 1) {
        roundScore += value;
        prevDice = value;
    } else {
        roundScore = 0;
        switchPlayer();
    }
    updateScores();
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameEnded) return;

    document.getElementById('dice').style.display = 'none';
    playerScores[activePlayer] += roundScore;
    roundScore = 0;
    updateScores();
    if (playerScores[activePlayer] >= 100) {
        document.getElementById('name-' + activePlayer).textContent = "Winner!";
        document.getElementById('dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gameEnded = true;
    } else {
        switchPlayer();
    }
});