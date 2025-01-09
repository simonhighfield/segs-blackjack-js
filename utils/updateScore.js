module.exports = updateScore = (hand) => {
    
    if (hand === undefined) {
        throw new TypeError("'hand' must be provided")
    } else if (!Array.isArray(hand)) {
        throw  new TypeError("'hand' should be an array")
    } else if (hand.length === 0) {
        throw  new TypeError("'hand' should not be empty")
    }

    hand.forEach(card => {
        if (card.emblem === undefined || card.name === undefined || card.values === undefined) {
            throw  new TypeError("'hand' should contain valid card objects")
        }
    });
    
    const handCopy = [...hand]
    const aceCards = handCopy.filter((card) => card.name === "Ace")
    
    if (!aceCards) {
        const score = getScore(handCopy);

        return [score]

    } else if (aceCards) {
        const scoreWhenAllAcesLow = getScore(handCopy);

        const scoresWhenEachAceHigh = aceCards.map((_, index) => scoreWhenAllAcesLow + ((index + 1) * 10)) 

        return [scoreWhenAllAcesLow, ...scoresWhenEachAceHigh]                                                                                                                                                                                                                                          
    }   
}



function getScore(hand) {
    return hand.reduce((accumulatedScore, card) => accumulatedScore + card.values[0], 0);
}
