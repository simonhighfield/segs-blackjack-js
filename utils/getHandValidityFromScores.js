const errorCheckArray = require("./errorCheckArray")

module.exports = getHandValidityFromScores = (inputScores) => {

    errorCheckScores(inputScores);

    const scores = [...inputScores]

    let anyValidScores = false

    scores.forEach((score) => {
        if (score <= 21) {
            anyValidScores = true
        } 
    })

    return anyValidScores
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