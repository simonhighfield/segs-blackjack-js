const errorCheckScores = require("../errorChecks/errorCheckScores");

module.exports = getHandValidityFromScores = (scores) => {
    errorCheckScores(scores);

    let anyValidScores = false

    scores.forEach((score) => {
        if (score <= 21) {
            anyValidScores = true
        } 
    })

    return anyValidScores
}