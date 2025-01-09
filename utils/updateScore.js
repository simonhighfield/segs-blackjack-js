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
    
    let score = 0
    for (let i = 0; i < handCopy.length; i++) {
        const card = handCopy[i];
        
        score += card.values[0]
    }

    const aces = handCopy.filter((card) => card.name === "Ace")
    
    const scores = [score]
    for (let i = 1; i <= aces.length; i++) {
        scores.push(score + (i * 10))
    }
    

    return scores
}