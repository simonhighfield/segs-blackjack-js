const errorCheckScores = require("../errorChecks/errorCheckScores");

module.exports = getBestScore = (possibleScores) => {
    errorCheckScores(possibleScores);

    const validScores = possibleScores.filter((score) => score <= 21)

    const bestScore = Math.max(...validScores)
    
    return bestScore
}