var cards = require('./cards');
// Blackjack game.
var deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
var pot = Number(0);
var balance;
var betAmount = Number(betAmount);

if((typeof alert) === 'undefined') {
    global.alert = function(message) {
        console.log(message);
    }
}

function BlackjackGame () {
    this.dealerHand = new BlackjackHand();
    this.playerHand = new BlackjackHand();
    this.result = 'None';
    this.cards = cards.createPlayingCards();
}
BlackjackGame.prototype.newGame = function () {

//if (!BlackjackGame.userBet) {
 //       alert('You\'re missing some critical information that is needed to proceed with the games');
//        newGame();
 //   }
//else if(true) {
    this.dealerHand = new BlackjackHand();
    this.playerHand = new BlackjackHand();
   // userBet(betAmount); //take users bet
    this.playerHand.addCard(this.cards.dealNextCard());
    this.dealerHand.addCard(this.cards.dealNextCard());
    this.playerHand.addCard(this.cards.dealNextCard());
    this.result = 'None';
// }
}

BlackjackGame.prototype.isInProgress = function () {
    return (this.result === 'None') && (this.dealerHand.hasCards());
}
BlackjackGame.prototype.toJson = function () {
    return {
        dealer: {
            cards: this.dealerHand.getCards(),
            score: this.dealerHand.getScore()
        },
        player: {
            cards: this.playerHand.getCards(),
            score: this.playerHand.getScore(),
            balance: 100.00
        },
        result: this.result
    };
}
BlackjackGame.prototype.getResultForPlayer = function () {
    var score = this.playerHand.getScore();
    if (score > 21) {
        return 'Bust';
    }
    return 'None';
}

BlackjackGame.prototype.isGameInProgress = function () {
    return this.result === 'None';
}

BlackjackGame.prototype.hit = function () {
    if (this.isGameInProgress()) {
        this.playerHand.addCard(this.cards.dealNextCard());
        this.result = this.getResultForPlayer();
    }
}

BlackjackGame.prototype.userBet = function (betAmount) {
  if (balance >= betAmount) {
            balance-= betAmount;
            pot += betAmount;
        }
        else {
            alert('You don\'t have enough money in your wallet');
            newGame();
        }
    }

BlackjackGame.prototype.getResult = function () {
    var playerScore = this.playerHand.getScore();
    var dealerScore = this.dealerHand.getScore();

    if (this.playerHand.isBust()) {
        return 'Bust';
    } else if (this.dealerHand.isBust()) {
        return 'Win';
    }

    if (playerScore > dealerScore) {
        balance += pot*2 
        pot = 0;
        return 'Win';
    } else if (playerScore === dealerScore) {
        return 'Push';
    }
    return 'Lose';
}

//HITS for the dealer if below 17
BlackjackGame.prototype.stand = function () {
    if (this.isGameInProgress()) {
        while (this.dealerHand.getScore() < 17) {
            this.dealerHand.addCard(this.cards.dealNextCard());        
        }
        this.result = this.getResult();
    }
}
// Blackjack hand.
function BlackjackHand() {
    this.cards = [];
}
BlackjackHand.prototype.hasCards = function () {
    return this.cards.length > 0;
}
BlackjackHand.prototype.addCard = function (card) {
    this.cards.push(card);
}
BlackjackHand.prototype.numberToSuit = function (number) {
  var suits = ['C', 'D', 'H', 'S'];
  var index = Math.floor(number / 13);
  return suits[index];
}
BlackjackHand.prototype.numberToCard = function (number) {
  return {
    rank: (number % 13) + 1,
    suit: this.numberToSuit(number)
  };
}
BlackjackHand.prototype.getCards = function () {
    var convertedCards = [];
    for (var i = 0; i < this.cards.length; i++) {
        var number = this.cards[i];
        convertedCards[i] = this.numberToCard(number);
    }
    return convertedCards;
}
BlackjackHand.prototype.getCardScore = function (card) {
    if (card.rank === 1) {
        return 11;
    } else if (card.rank >= 11) {
        return 10;
    }
    return card.rank;
}

BlackjackHand.prototype.getScore = function () {
    var score = 0;
    var cards = this.getCards();
    var aces = [];
    // Sum all cards excluding aces.
    for (var i = 0; i < cards.length; ++i) {
        var card = cards[i];
        if (card.rank === 1) {
            aces.push(card);
        } else {
            score = score + this.getCardScore(card);
        }
    }
    // Add aces.
    if (aces.length > 0) {
        var acesScore = aces.length * 11;
        var acesLeft = aces.length;
        while ((acesLeft > 0) && (acesScore + score) > 21) {
            acesLeft = acesLeft - 1;
            acesScore = acesScore - 10;
        }
        score = score + acesScore;
    }
    return score;
}
BlackjackHand.prototype.isBust = function () {
    return this.getScore() > 21;
}
// Exports.
function newGame () {
    return new BlackjackGame();
}

exports.newGame = newGame