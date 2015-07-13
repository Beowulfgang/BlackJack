function PlayingCards() {
    this.cards = this.getShuffledPack();
}

PlayingCards.prototype.getShuffledPack = function () {
    function card(value,suit,face) {
        this.value = value; //Card point value
        this.suit = suit; //Card suit
        this.face = face; //What you see on the card
    }
    var deck = [];
    var suits = ['H','D','S','C'];
    for(var i = 0; i < 52; i++) {
        var numb = i%13 +1;
        switch(numb) {
            case 13: deck.push(new card(10,suits[i%4],numb)); //King
            break;
            case 12: deck.push(new card(10,suits[i%4],numb)); //Queen
            break;
            case 11: deck.push(new card(10,suits[i%4],numb)); //Jack
            break;
            default: deck.push(new card(numb,suits[i%4],numb)); //Not these
            break;
        }
    }
    for(var i = 0; i < deck.length; i++) {
        for(var j = 0; j < deck.length; j++) {
            var randomIndex = Math.floor(Math.random()*deck.length);
            var temp = deck[randomIndex];
            deck[randomIndex] = deck[j];
            deck[j] = temp;
        }
    }
    return deck;
}

PlayingCards.prototype.dealNextCard = function () {
    if (this.cards.length === 0) {
        this.cards = this.getShuffledPack();
    }
    return this.cards.shift();
}
function createPlayingCards () {
    return new PlayingCards();
}
exports.createPlayingCards = createPlayingCards