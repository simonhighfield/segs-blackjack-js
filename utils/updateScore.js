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
    const aces = handCopy.filter((card) => card.name === "Ace")
    
    if (!aces) {
        const score = handCopy.reduce((accumulatedScore, card) => accumulatedScore + card.values[0], 0)

        return [score]
    } else {
        const allAcesLowScore = handCopy.reduce((accumulatedScore, card) => accumulatedScore + card.values[0], 0)

        const scores = [allAcesLowScore]
    
        for (let i = 1; i <= aces.length; i++) {
            scores.push(allAcesLowScore + (i * 10))
        }
        
        return scores
    }   
}