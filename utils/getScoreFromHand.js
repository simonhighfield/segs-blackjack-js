module.exports = getScoreFromHand = (inputHand) => {
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
            } else {
                return [scoreIfAllAcesAreLow]
            }                                                                                                                                                                                                     
        }   
    }
    catch (error) {
        // console.error("error in getScoreFromHand: ", error.message);
        throw error
    }
}


function errorCheckHand(inputHand) {
    if (inputHand === undefined) {
        throw new TypeError("'hand' must be provided");
    } else if (!Array.isArray(inputHand)) {
        throw new TypeError("'hand' should be an array");
    } else if (inputHand.length === 0) {
        throw new TypeError("'hand' should not be empty");
    }

    inputHand.forEach(card => {
        if (card.emblem === undefined || card.name === undefined || card.values === undefined) {
            throw new TypeError("'hand' should contain valid card objects");
        }
    });
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