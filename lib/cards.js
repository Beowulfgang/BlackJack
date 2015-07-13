
function PlayingCards() {
    this.cards = this.getShuffledPack();
    this.currentPackLocation = 0;
}
PlayingCards.prototype.getRandomInt =q1 function (max) {
    return Math.floor(Math.random() * (max + 1));
}
PlayingCards.prototype.getShuffledPack = function () {
    var cards = [];
    cards[0] = 0;
    
    for (var i = 1; i < 52; i++) {
        var j = this.getRandomInt(i);
        cards[i] = cards[j];
        cards[j] = i;        
    }
    return cards;
}
PlayingCards.prototype.dealNextCard = function () {

    if (this.currentPackLocation >= this.cards.length) {

        this.cards = this.getShuffledPack();
        this.currentPackLocation = 0;
    }
    var cardNumber = this.cards[this.currentPackLocation];
    this.currentPackLocation = this.currentPackLocation + 1;

    return cardNumber;
}
function createPlayingCards () {
    return new PlayingCards();
}
exports.createPlayingCards = createPlayingCards