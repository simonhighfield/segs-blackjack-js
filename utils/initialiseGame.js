const dealCard = require("./dealCard")
const generateDeck = require("./generateDeck")

module.exports = initialiseGame = () => {

    let deck = generateDeck()

    const {playerHand, dealerHand, newDeck}  = dealCards(deck)
    deck = [...newDeck]

    // get



    return {dealerHand, playerHand, deck}



    function dealCards(deck) {
        let playerHand = []
        let dealerHand = []

        let { newDeck, newHand } = dealCard(deck, playerHand); 
        playerHand = [...newHand];
    
        ( { newDeck, newHand } = dealCard(newDeck, dealerHand));
        dealerHand = [...newHand];
    
        ( { newDeck, newHand } = dealCard(newDeck, playerHand));
        playerHand = [...newHand];
    
        ( { newDeck, newHand } = dealCard(newDeck, dealerHand));
        dealerHand = [...newHand];

        return {playerHand, dealerHand, newDeck}
    }
}