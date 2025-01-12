const errorCheckPlayerName = require("./errorCheckPlayerName")
const errorCheckHand = require("./errorCheckHand")
const errorCheckScores = require("./errorCheckScores")
const getBestScore = require("./getBestScore")
const errorCheckObject = require("./errorCheckObject")

module.exports = updateResultsLookup = (resultsLookup, playerName, scores) => {

    errorCheckObject(resultsLookup, 'resultsLookup')
    errorCheckPlayerName(playerName)
    errorCheckScores(scores, 'scores')

    const output = {...resultsLookup}
    output[playerName] = getBestScore(scores)

    return output
}