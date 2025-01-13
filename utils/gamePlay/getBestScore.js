const errorCheckScores = require("../errorChecks/errorCheckScores");

module.exports = getBestScore = (inputScores) => {

    errorCheckScores(inputScores);

    const scores = [...inputScores]

    const validScores = scores.filter((score) => score <= 21)

    const bestScore = Math.max(...validScores)
    
    return bestScore
}