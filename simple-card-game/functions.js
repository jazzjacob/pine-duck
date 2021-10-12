const convertCardToNumberValue = (cardCode) => {
  switch (cardCode) {
    case '2C': return 1;
    case '2D': return 2;
    case '2H': return 3;
    case '2S': return 4;
    
    case '3C': return 5;
    case '3D': return 6;
    case '3H': return 7;
    case '3S': return 8;
    
    case '4C': return 9;
    case '4D': return 10;
    case '4H': return 11;
    case '4S': return 12;
    
    case '5C': return 13;
    case '5D': return 14;
    case '5H': return 15;
    case '5S': return 16;
    
    case '6C': return 17;
    case '6D': return 18;
    case '6H': return 19;
    case '6S': return 20;
    
    case '7C': return 21;
    case '7D': return 22;
    case '7H': return 23;
    case '7S': return 24;
    
    case '8C': return 25;
    case '8D': return 26;
    case '8H': return 27;
    case '8S': return 28;
    
    case '9C': return 29;
    case '9D': return 30;
    case '9H': return 31;
    case '9S': return 32;
    
    case '0C': return 33;
    case '0D': return 34;
    case '0H': return 35;
    case '0S': return 36;
    
    case 'JC': return 37;
    case 'JD': return 38;
    case 'JH': return 39;
    case 'JS': return 40;
    
    case 'QC': return 41;
    case 'QD': return 42;
    case 'QH': return 43;
    case 'QS': return 44;
    
    case 'KC': return 45;
    case 'KD': return 46;
    case 'KH': return 47;
    case 'KS': return 48;
    
    case 'AC': return 49;
    case 'AD': return 50;
    case 'AH': return 51;
    case 'AS': return 52;
  }
}

const printEndMessage = (parent, nextRoundButton, p1Score, p2Score) => {
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
  parent.append(endWinnerMessage);
}

export {convertCardToNumberValue, printEndMessage};