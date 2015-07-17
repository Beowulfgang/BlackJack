var cards = require('./cards'),
    players = require('./player');
// Blackjack game.
function BlackjackGame () {
    this.hands = [new BlackjackHand()];
    this.players = [];
    this.cards = cards.createPlayingCards();
    this.pot = 0;
}

BlackjackGame.prototype.newGame = function () {

    this.hands = [new BlackjackHand()];
    for(var i = 0; i < this.players.length; i++) {
        if(this.players[i].balance < 5) {
            this.players.splice(i,1);
        }
    }
    var handsies = [];
    for(var i = 0; i < 2 * this.players.length; i++) {
        handsies.push(this.cards.dealNextCard());
    }
    for(var i = 0; i < this.players.length; i++) {
        this.players[i].addnewHand(new Hand(handsies[i], handsies[i+this.players.length], 5));
    }
}

BlackjackGame.prototype.isInProgress = function () {
    for(var i = 0; i < this.players.length; i++) {
        if(this.players[i].playing === true) {
            return true;
        }
    }
    return false;
}

BlackjackGame.prototype.toJson = function () {
    var someBogusArrayAgain = [];
    for(var i = 0; i < this.players.length; i++) {
        someBogusArrayAgain.push(this.players[i]);
    }
    return {
        dealer: {
            cards: this.dealerHand.cards,
            score: this.dealerHand.getScore()
        },
        players: someBogusArrayAgain,
        pot: this.pot
    };
}
BlackjackGame.prototype.getResultForPlayers = function () {
    for (var i = 0; i < this.players.length; i++) {
        for (var j = 0; j < this.players[i].hands.length; j++) {
            this.players[i].hands[j].isBusted();
        };
    };
}

BlackjackGame.prototype.getResult = function () {
    var currentWinningPlayer = null;
    for(var i = 0; i < this.players.length; i++) {
        for(var j = 0; j < this.players[i].hands.length; j++) {
            if(this.players[i].hands[j].isBusted() === true) {
                continue;
            }
            //
        }
    }
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

BlackjackGame.prototype.hit = function () {
    if (this.isGameInProgress()) {
        this.playerHand.addCard(this.cards.dealNextCard());
        this.result = this.getResultForPlayer();
    }
}

BlackjackGame.prototype.bet = function() {
    if(this.playerBalance > 0) {
        //Check that amount does not exceed current balance
            //Get data from html/css source
            //subtract amount from playerBalance, add it to pot
        //Else reject bet
    } else {
        //Do some sort of error handling
    }
}

BlackjackGame.prototype.split = function() {
    if(this.playerHand.cards[0].face === this.playerHand.cards[1].face) {
        //Get a new hand and assign it somewhere. :(
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
BlackjackHand.prototype.getScore = function () {
    var score = 0;
    var cards = this.cards;
    var aces = [];
    // Sum all cards excluding aces.
    for (var i = 0; i < cards.length; ++i) {
        var card = cards[i];
        if (card.value === 1) {
            aces.push(card);
        } else {
            score = score + card.value;
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