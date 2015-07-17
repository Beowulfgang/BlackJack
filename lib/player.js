function Player(balance) {
	this.playing = false;
	this.hands = [];
	this.balance = balance || 200;
}

Player.prototype.addNewHand = function(newHand) {
	this.hands.push(newHand);
	this.playing = true;
}

Player.prototype.clearHand = function() {
	this.hands = [];
	this.playing = false;
}

function Hand(card0, card1, cardPot) {
	this.cardPot = cardPot;
	this.busted = false;
	this.cards.push(card0);
	this.cards.push(card1);
}

Hand.prototype.hit = function(card) {
	this.cards.push(card);
	this.isBusted();
};

Hand.prototype.stand = function() {
	//Possibly redundant
};

//Split checking needs to be done by the dealer (this includes: 2 of the same card, only 2 cards, and having enough balance)
Hand.prototype.split = function(nextCard0, nextCard1) {
	var splitCard = this.cards.shift();
	this.cards.push(nextCard0);
	return new Hand(splitCard, nextCard1, this.bet);
};

Hand.prototype.bet = function(betAmount) {
	this.cardPot += betAmount;
};

Hand.prototype.getScore = function() {
	var total = 0;
	var aces = 0;
	for(var card in this.cards) {
		if(card.value !== 1) {
			total += card.value;
		} else {
			aces++;
		}
	}
	if(aces !== 0) {
		for(var i = 0; i < aces; i++) {
			var aceValue = (aces - i)*11 + i*1;
			if(aceValue + total <= 21) {
				aces = 0;
				total += aceValue;
				break;
			}
		}
		if(aces !== 0) {
			total += aces;
		}
	}
	return total;
};

Hand.prototype.isBusted = function() {
	if(this.getScore() > 21) {
		this.busted = true;
		return true;
	}
	return false;
}