const dealCard = require("./dealCard")
const generateDeck = require("./generateDeck")
const getBestScore = require("./getBestScore")
const getScoresFromHand = require("./getScoresFromHand")

module.exports = initialiseGame = () => {

    let deck = generateDeck()

    const {playerHand, dealerHand, newDeck}  = dealCards(deck)
    deck = [...newDeck]

    const dealerPossibleScores = getScoresFromHand(dealerHand)

    const dealerBestScore = getBestScore(dealerPossibleScores)

    const resultsLookup = {'dealer': dealerBestScore}

    return {dealerHand, playerHand, deck, resultsLookup}



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