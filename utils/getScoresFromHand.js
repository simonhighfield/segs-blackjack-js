const errorCheckHand = require("./errorCheckHand");

module.exports = getScoresFromHand = (inputHand) => {
    try {
        errorCheckHand(inputHand);
        
        const hand = [...inputHand]
        
        const aceCards = hand.filter((card) => card.name === "Ace")
        
        if (aceCards.length === 0) {            
            const score = getScore(hand);
    
            return [score]
        } 
        else {
            const scoreIfAllAcesAreLow = getScore(hand);
    
            const scoreIfOneAceIsHigh = scoreIfAllAcesAreLow + 10

            if (scoreIfOneAceIsHigh < 21) {
                return [scoreIfAllAcesAreLow, scoreIfOneAceIsHigh]

            } else if (scoreIfOneAceIsHigh === 21) {            
                return [scoreIfOneAceIsHigh]

            } else if (scoreIfOneAceIsHigh > 21) {
                return [scoreIfAllAcesAreLow]
            }                                                                                                                                                                                                     
        }   
    }
    catch (error) {
        // console.error("error in getScoresFromHand: ", error.message);
        throw error
    }
}


function getAltScoresByMakingEachAceHigh(aceCards, scoreIfAllAcesAreLow) {
    return aceCards.map((_, index) => {
        numberOfAcesMadeHigh = index + 1
        
        return scoreIfAllAcesAreLow + (numberOfAcesMadeHigh * 10)
    });
}

function getScore(hand) {
    return hand.reduce((accumulatedScore, card) => accumulatedScore + card.values[0], 0);
}