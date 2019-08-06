/***************
 * Rules of the game
  - The game has two players, playing in rounds
  - In each turn, a player rolls a dice as many times he/she wishes and each result 
 * is added to their ROUND score
  - BUT, if a player rolls a 1, all his ROUND score gets lost. After that, it's the 
 * next player's turn
  - The player can choose to 'Hold', which means that their ROUND score will get
 * added to the GLOBAL score. After that, it is the next player's turn
  - The first player to reach 100 points on the GLOBAL score WINS the game
 */
/*********************************************************************************
 * Challanges
  1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
  ( HINT: always save the previous dice roll in a seperate variable)
  2. Add an input field to the HTML where the players can set the winning score. so they can change the
  predefined score 100. (HINT: you can read that value with the .value property in JS. Us Google if necessary)
  3. Add another dice to the game, so that there are two dices now. The player looses his current score 
  when one of them us a 1. (HINT: you will need CSS to position the second dice)
 */
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
   if (gamePlaying) {
       //1. Random number
       var dice1 = Math.floor(Math.random() * 6) + 1;
       var dice2 = Math.floor(Math.random() * 6) + 1;


       //2. Display the result
       document.getElementById('dice-1').style.display = 'block';
       document.getElementById('dice-2').style.display = 'block';
       document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
       document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

       if (dice1 !== 1 && dice2 !== 1) {
        //Add score
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //Next player
            nextPlayer();
        }


/*
       //3. Update the round score IF the rolled number was NOT a 1
       if(dice ===6 && lastDice === 6){
           //player looses score
           scores[activePlayer] = 0;
           document.querySelector('#score-' + activePlayer).textContent = '0';
           nextPlayer();
       }else if (dice !== 1) {
           //Add score
           roundScore += dice;
           document.querySelector('#current-' + activePlayer).textContent = roundScore;

       } else {
           //Next player
           nextPlayer();
       }

       lastDice = dice;
*/
   }

});


document.querySelector('.btn-hold').addEventListener('click', function(){
   if (gamePlaying) {
       //Add current score to the global score
       scores[activePlayer] += roundScore;

       //Update the UI
       document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      var input = document.querySelector('.final-score').value;
      var winningScore;

      //all values of undefined, 0, or "" are COERCED to false
      //Anything else is COERCED to true
      if(input) {
          winningScore = input;
      } else {
          winningScore = 100;
      }
      
       //Check if player WON the game
       if (scores[activePlayer] >= winningScore) {
           document.querySelector('#name-' +activePlayer).textContent = 'WINNER!';
           document.getElementById('dice-1').style.display = 'none';
           document.getElementById('dice-2').style.display = 'none';
           document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
           document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
           gamePlaying = false;
       } else {
           //Next player
           nextPlayer();
       }

   }
       
});

function nextPlayer () {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';}


document.querySelector('.btn-new').addEventListener('click', init);

function init () {
   scores = [0,0];
   roundScore = 0;
   activePlayer = 0;

   gamePlaying = true;

   document.getElementById('dice-1').style.display = 'none';
   document.getElementById('dice-2').style.display = 'none';

   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.getElementById('name-0').textContent = 'Player 1';
   document.getElementById('name-1').textContent = 'Player 2';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');

}




//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' +  dice + '</em>';
//var x = document.querySelector('#score-0').textContent;
//console.log(x);
