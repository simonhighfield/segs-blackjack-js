const errorCheckArray = require("./errorCheckArray")

module.exports = getHandValidityFromScores = (inputScores) => {

    errorCheckScores(inputScores);

    const scores = [...inputScores]

    if (scores[0] <= 21) {
        return true
    } else {
        return false
    }
}

function errorCheckScores(inputScores) {
    errorCheckArray(inputScores, 'scores');

    inputScores.forEach(score => {
        if (typeof score !== 'number') {
            throw new TypeError("'scores' should be numbers");
        }
        else if (score < 2) {
            throw new TypeError("'scores' should be at least 2");
        }
    });
}