const errorCheckScores = require("../errorChecks/errorCheckScores");

module.exports = getBestScore = (inputPossibleScores) => {

    errorCheckScores(inputPossibleScores);

    // const possibleScores = [...inputPossibleScores]

    const validScores = inputPossibleScores.filter((score) => score <= 21)

    const bestScore = Math.max(...validScores)
    
    return bestScore
}