const errorCheckArray = require("./errorCheckArray")

module.exports = errorCheckScores = (inputScores) => {
    errorCheckArray(inputScores, 'scores');

    let anyValidScore = false
    inputScores.forEach(score => {
        if (typeof score !== 'number') {
            throw new TypeError("'scores' should be numbers");
        }
        else if (score < 2) {
            throw new TypeError("'scores' should be at least 2");
        }
        else if (score <= 21) {
            anyValidScore = true
        }
    });

    if (!anyValidScore) {
        throw new TypeError("'scores' should contain at least one score < 21");
    }
}