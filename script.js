'use strict';
var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector(".btn.btn--roll").addEventListener("click", function(){

    if(gamePlaying){
        var dice = Math.floor(Math.random() * 6) + 1;

        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${dice}.png`

        if(lastDice === 6 && dice === 6){
            scores[activePlayer] = 0;
            document.querySelector(`#score--${activePlayer}`).textContent = "0";  
            NextPlayer(); 
        } else if (dice !== 1){
            roundScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = roundScore;
        } else {
            NextPlayer();
        }

        lastDice=dice;
    }
})

document.querySelector(".btn.btn--hold").addEventListener("click", function(){

    if(gamePlaying){
        scores[activePlayer] += roundScore;

        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        var input = document.querySelector(".final-score").value;
        var winningScore;

        if(input){
            winningScore = input;
        } else {
            winningScore = 10;
        }

        if (scores[activePlayer] >= winningScore){
            document.querySelector(`#name--${activePlayer}`).textContent = "Winner!!!";
            document.querySelector(".dice").style.display = 'none';
            document.querySelector(`.player.player--${activePlayer}`).classList.add("winner");
            gamePlaying = false;
        } else {
            NextPlayer();
        }
    }
})

document.querySelector(".btn.btn--new").addEventListener("click", init)

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = 'none';
    
    document.querySelector("#score--0").textContent = "0";
    document.querySelector("#score--1").textContent = "0";
    document.querySelector("#current--0").textContent = "0";
    document.querySelector("#current--1").textContent = "0";
    document.querySelector(`#name--0`).textContent = "Player 1";
    document.querySelector(`#name--1`).textContent = "Player 2";
    document.querySelector(".player.player--0").classList.remove("winner");
    document.querySelector(".player.player--1").classList.remove("winner");
    document.querySelector(".player.player--0").classList.remove("player--active");
    document.querySelector(".player.player--0").classList.add("player--active");
    document.querySelector(".player.player--1").classList.remove("player--active");
}

function NextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector("#current--0").textContent = roundScore;
    document.querySelector("#current--1").textContent = roundScore;

    document.querySelector(`.player.player--0`).classList.toggle("player--active");
    document.querySelector(`.player.player--1`).classList.toggle("player--active");

    document.querySelector(".dice").style.display = 'none';
}