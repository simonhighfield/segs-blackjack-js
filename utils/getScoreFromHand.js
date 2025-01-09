module.exports = getScoreFromHand = (inputHand) => {
    try {
        errorCheckHand(inputHand);
        
        const hand = [...inputHand]
        
        const aceCards = hand.filter((card) => card.name === "Ace")
        
        if (!aceCards) {
            const score = getScore(hand);
    
            return [score]
        } 
        else if (aceCards) {
            const lowestScore = getScore(hand);
    
            const alternateScores = getAltScoresByMakingEachAceHigh(aceCards, lowestScore) 
    
            return [lowestScore, ...alternateScores]                                                                                                                                                                                                                                          
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

function getAltScoresByMakingEachAceHigh(aceCards, lowestScore) {
    return aceCards.map((_, index) => {
        numberOfAcesMadeHigh = index + 1
        
        return lowestScore + (numberOfAcesMadeHigh * 10)
    });
}

function getScore(hand) {
    return hand.reduce((accumulatedScore, card) => accumulatedScore + card.values[0], 0);
}