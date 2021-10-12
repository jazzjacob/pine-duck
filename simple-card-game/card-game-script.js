import {convertCardToNumberValue} from './functions.js';

const deckButton = document.querySelector('#deck-button');
const reshuffleButton = document.querySelector('#reset-button');
const buttonOne = document.querySelector('#button-one');
const buttonTwo = document.querySelector('#button-two');
const playerOneCard = document.querySelector('.player-one > .card');
const playerTwoCard = document.querySelector('.player-two > .card');
const deck = document.querySelector('#deck');
const p1ScoreElement = document.querySelector('.player-one .score');
const p2ScoreElement = document.querySelector('.player-two .score');
const startGameElement = document.querySelector('#start-game');
const main = document.querySelector('main');
const playersContainer = document.querySelector('.players-container');

const newDeckURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

let remainingCards;
let deckID;
let p1DrawnCard;
let p2DrawnCard;
let p1Score = 0;
let p2Score = 0;

const nextRoundButton = document.createElement('button');

const printEndMessage = () => {
  nextRoundButton.style.display = 'none';
  const endWinnerMessage = document.createElement('p');
  endWinnerMessage.classList.add('winner-message');
  if (p1Score > p2Score) {
    endWinnerMessage.innerText = 'Player One Wins!';
  } else if (p1Score < p2Score) {
    endWinnerMessage.innerText = 'Player Two Wins!';
  } else {
    endWinnerMessage.innerText = 'It\'s a tie!';
  }
  deck.append(endWinnerMessage);
}

deckButton.addEventListener('click', async function(event) {
  const response = await fetch(newDeckURL);
  const newDeck = await response.json();
  deckID = newDeck.deck_id;
  remainingCards = newDeck.remaining;
  let deckMessage = `Cards remaining in deck: `;
  const p = document.createElement('p');
  p.innerText = deckMessage;
  const counter = document.createElement('span');
  counter.className = 'remaining-cards';
  counter.innerText = remainingCards;
  p.appendChild(counter);
  deck.appendChild(p);
  
  if (deckID) {
    buttonOne.classList.remove('hidden');
    buttonTwo.classList.remove('hidden');
    reshuffleButton.classList.remove('remove');
    startGameElement.style.display = 'none';
  }

})

buttonOne.addEventListener('click', async function(event) {
  if (deckID) {
    const drawCardURL = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;
    const response = await fetch(drawCardURL);
    const drawnCard = await response.json();
    const cardImage = drawnCard.cards[0].images.png;
    
    buttonOne.disabled = true;
    
    playerOneCard.style.backgroundImage = `url(${cardImage})`;
    playerOneCard.style.borderRadius = 0;
    playerOneCard.style.backgroundColor = 'white';
    
    p1DrawnCard = drawnCard.cards[0].code;
    p1DrawnCard = convertCardToNumberValue(p1DrawnCard);
    
    remainingCards = drawnCard.remaining;
    
    const counter = document.querySelector('.remaining-cards');
    counter.innerText = remainingCards;
    
    if (p2DrawnCard) {
      if (p1DrawnCard > p2DrawnCard) {
        buttonOne.innerText = 'Winner!';
        buttonOne.classList.add('winner');
        
        buttonTwo.innerText = 'Loser';
        p1Score++;
        p1ScoreElement.innerText = p1Score;
      } else {
        buttonTwo.innerText = 'Winner!';
        buttonTwo.classList.add('winner');
        buttonOne.innerText = 'Loser';
        p2Score++;
        p2ScoreElement.innerText = p2Score;
      }
      if (nextRoundButton.style.display === 'none') {
        nextRoundButton.style.display = 'block';
      }
      buttonOne.disabled = true;
      nextRoundButton.innerText = 'Next round';
      main.appendChild(nextRoundButton);
      p1DrawnCard = null;
      p2DrawnCard = null;
    }
    if (remainingCards === 0) {
      nextRoundButton.style.display = 'none';   
      printEndMessage();
    }    
  }
})


buttonTwo.addEventListener('click', async function(event) {
  if (deckID) {
    const drawCardURL = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;
    const response = await fetch(drawCardURL);
    const drawnCard = await response.json();
    const cardImage = drawnCard.cards[0].images.png;
    
    buttonTwo.disabled = true;
    
    playerTwoCard.style.backgroundImage = `url(${cardImage})`;
    playerTwoCard.style.borderRadius = 0;
    playerTwoCard.style.backgroundColor = 'white';
    
    p2DrawnCard = drawnCard.cards[0].code;
    p2DrawnCard = convertCardToNumberValue(p2DrawnCard);
    
    remainingCards = drawnCard.remaining;
    
    const counter = document.querySelector('.remaining-cards');
    counter.innerText = remainingCards;
        
    if (p1DrawnCard) {
      if (p1DrawnCard > p2DrawnCard) {
        buttonOne.innerText = 'Winner!';
        buttonOne.classList.add('winner');
        
        buttonTwo.innerText = 'Loser';
        p1Score++;
        p1ScoreElement.innerText = p1Score;
      } else {
        buttonTwo.innerText = 'Winner!';
        buttonTwo.classList.add('winner');
        buttonOne.innerText = 'Loser';
        p2Score++;
        p2ScoreElement.innerText = p2Score;
      }
      if (nextRoundButton.style.display === 'none') {
        nextRoundButton.style.display = 'block';
      }
      nextRoundButton.innerText = 'Next round';
      main.appendChild(nextRoundButton);
      buttonOne.disabled = true;
      p1DrawnCard = null;
      p2DrawnCard = null;
    }
    if (remainingCards === 0) {
      nextRoundButton.style.display = 'none';    
      printEndMessage();
    }  
  }
})

nextRoundButton.addEventListener('click', function(event) {
  if (buttonOne.classList.value.includes('winner')) {
    buttonOne.classList.remove('winner');
  } else if (buttonTwo.classList.value.includes('winner')) {
    buttonTwo.classList.remove('winner');
  }
  buttonOne.innerText = 'Draw card';
  buttonTwo.innerText = 'Draw card';
  
  playerOneCard.style.backgroundImage = null;
  playerTwoCard.style.backgroundImage = null;
  playerOneCard.style.backgroundColor = 'gold';
  playerTwoCard.style.backgroundColor = 'gold';
  playerOneCard.style.borderRadius = '10px';
  playerTwoCard.style.borderRadius = '10px';
  
  nextRoundButton.style.display = 'none';
  
  buttonOne.disabled = false;
  buttonTwo.disabled = false;
})

reshuffleButton.addEventListener('click', async function(event) {
  const reshuffleDeckURL = `https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`;
  const response = await fetch(reshuffleDeckURL);
  const reshuffledDeck = await response.json();
  remainingCards = reshuffledDeck.remaining;
  const counter = document.querySelector('.remaining-cards');
  counter.innerText = remainingCards;
  
  p1DrawnCard = null;
  p2DrawnCard = null;
  p1Score = 0;
  p2Score = 0;
  p1ScoreElement.innerText = p1Score;
  p2ScoreElement.innerText = p1Score;
  
  if (buttonOne.classList.value.includes('winner')) {
    buttonOne.classList.remove('winner');
  } else if (buttonTwo.classList.value.includes('winner')) {
    buttonTwo.classList.remove('winner');
  }
  buttonOne.innerText = 'Draw card';
  buttonTwo.innerText = 'Draw card';
  console.dir(buttonOne.classList);
  
  playerOneCard.style.backgroundImage = null;
  playerTwoCard.style.backgroundImage = null;
  playerOneCard.style.backgroundColor = 'gold';
  playerTwoCard.style.backgroundColor = 'gold';
  playerOneCard.style.borderRadius = '10px';
  playerTwoCard.style.borderRadius = '10px';
  
  nextRoundButton.style.display = 'none';
  
  if (buttonOne.disabled) {
    buttonOne.disabled = false;
    buttonTwo.disabled = false;
  }
  
  if (document.querySelector('.winner-message')) {
    const endWinnerMessage = document.querySelector('.winner-message');
    endWinnerMessage.remove();
  }
})


