module.exports = updateScore = (hand, score) => {

    console.log('executed');
    

    if (!Array.isArray(hand)) {
        throw  new TypeError("'hand' should be an array")
    } else if (typeof score !== 'number') {
        throw  new TypeError("'score' should be a number")
    }

    return {  }
}