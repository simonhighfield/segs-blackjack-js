const errorCheckCardArray = require("../errorChecks/errorCheckCardArray");

module.exports = getPossibleScoresFromHand = (hand) => {
    errorCheckCardArray(hand, 'hand');
            
    const aceCards = hand.filter((card) => card.name === "Ace")
    
    if (aceCards.length === 0) {            
        const score = getScore(hand);

        return [score]
    } 
    else {
        const scoreIfAllAcesAreLow = getScore(hand);

        const scoreIfOneAceIsHigh = scoreIfAllAcesAreLow + 10

        if (scoreIfOneAceIsHigh <= 21) {
            return [scoreIfAllAcesAreLow, scoreIfOneAceIsHigh]

        } else {
            return [scoreIfAllAcesAreLow]
        }                                                                                                                                                                                                     
    }   
    
    

    function getScore(hand) {
        return hand.reduce((accumulatedScore, card) => accumulatedScore + card.values[0], 0);
    }
}
