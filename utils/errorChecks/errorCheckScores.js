const errorCheckArray = require("./errorCheckArray")

module.exports = errorCheckScores = (inputScores) => {
    errorCheckArray(inputScores, 'scores');

    if (inputScores.length === 0) {
        throw new TypeError(`'scores' should not be empty`);
    }

    inputScores.forEach(score => {
        if (typeof score !== 'number') {
            throw new TypeError("'scores' should be numbers");
        }
        else if (score < 2) {
            throw new TypeError("'scores' should be at least 2");
        }
    });
}