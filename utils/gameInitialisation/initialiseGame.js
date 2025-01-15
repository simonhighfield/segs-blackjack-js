const generateDeck = require("./generateDeck")
const dealCard = require("../gamePlay/dealCard")
const getPossibleScoresFromHand = require("../gamePlay/getPossibleScoresFromHand")
const getBestScore = require("../gamePlay/getBestScore")

module.exports = initialiseGame = () => {

    let deck = generateDeck()

    const {playersHand, dealersHand, newDeck}  = dealTwoCardsEach(deck)
    deck = [...newDeck]

    const dealersPossibleScores = getPossibleScoresFromHand(dealersHand)

    const dealersBestScore = getBestScore(dealersPossibleScores)

    const resultsLookup = {'dealer': dealersBestScore}

    return {dealersHand, playersHand, deck, resultsLookup}


    
    function dealTwoCardsEach(deck) {
        let playersHand = []
        let dealersHand = []

        let { newDeck, newHand } = dealCard(deck, playersHand); 
        playersHand = [...newHand];
    
        ( { newDeck, newHand } = dealCard(newDeck, dealersHand));
        dealersHand = [...newHand];
    
        ( { newDeck, newHand } = dealCard(newDeck, playersHand));
        playersHand = [...newHand];
    
        ( { newDeck, newHand } = dealCard(newDeck, dealersHand));
        dealersHand = [...newHand];

        return {playersHand, dealersHand, newDeck}
    }
}