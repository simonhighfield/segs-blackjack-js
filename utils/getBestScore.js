const errorCheckScores = require("./errorCheckScores");

module.exports = getBestScore = (inputScores) => {

    errorCheckScores(inputScores);

    const scores = [...inputScores]
    
    const bestScore = Math.max(...scores)
    
    return bestScore
}