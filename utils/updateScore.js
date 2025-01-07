module.exports = updateScore = (hand, score) => {
    
    if (hand === undefined || score === undefined) {
        throw new TypeError("both 'hand' and 'score' must be provided")
    } else if (!Array.isArray(hand)) {
        throw  new TypeError("'hand' should be an array")
    } else if (typeof score !== 'number') {
        throw  new TypeError("'score' should be a number")
    } else if (hand.length === 0) {
        throw  new TypeError("'hand' should not be empty")
    } else if (score < 0) {
        throw  new TypeError("'score' should not be negative")
    }

    return 1
}