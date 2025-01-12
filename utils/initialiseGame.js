const dealCard = require("./dealCard")
const generateDeck = require("./generateDeck")

module.exports = initialiseGame = () => {

    let deck = generateDeck()
    let playerHand = []
    let dealerHand = []

    let { newDeck, newHand } = dealCard(deck, playerHand); 
    playerHand = [...newHand];

    ( { newDeck, newHand } = dealCard(newDeck, dealerHand));
    dealerHand = [...newHand];

    ( { newDeck, newHand } = dealCard(newDeck, playerHand));
    playerHand = [...newHand];

    deck = [...newDeck]

    return {dealerHand, playerHand, deck}

}