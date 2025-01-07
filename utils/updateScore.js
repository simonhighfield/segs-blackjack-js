module.exports = updateScore = (hand, score) => {

    console.log('executed');
    
    if (hand === undefined || score === undefined) {
        throw new TypeError("both 'hand' and 'score' must be provided")
    } else if (!Array.isArray(hand)) {
        throw  new TypeError("'hand' should be an array")
    } else if (typeof score !== 'number') {
        throw  new TypeError("'score' should be a number")
    }

    return {  }
}