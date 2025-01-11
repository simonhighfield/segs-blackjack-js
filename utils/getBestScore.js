const errorCheckScores = require("./errorCheckScores");

module.exports = getBestScore = (inputScores) => {

    errorCheckScores(inputScores);

    const bestScore = Math.max(...inputScores)

    return bestScore
}