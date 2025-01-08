module.exports = updateScore = (hand) => {
    
    if (hand === undefined) {
        throw new TypeError("'hand' must be provided")
    } else if (!Array.isArray(hand)) {
        throw  new TypeError("'hand' should be an array")
    } else if (hand.length === 0) {
        throw  new TypeError("'hand' should not be empty")
    }

    const handCopy = [...hand]
    const card = handCopy[0]

    if (card.emblem === undefined || card.name === undefined || card.values === undefined) {
        throw  new TypeError("'hand' should contain valid card objects")
    }

    const values = card.values
    const scores = values
    
    return scores
}