const errorCheckArray = require("./errorCheckArray")

module.exports = getHandValidityFromScores = (inputScores) => {

    errorCheckScores(inputScores);

    return true
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