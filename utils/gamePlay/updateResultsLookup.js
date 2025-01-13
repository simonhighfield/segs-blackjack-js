const errorCheckObject = require("../errorChecks/errorCheckObject")
const errorCheckPlayerName = require("../errorChecks/errorCheckPlayerName")
const errorCheckScores = require("../errorChecks/errorCheckScores")
const getBestScore = require("./getBestScore")

module.exports = updateResultsLookup = (resultsLookup, playerName, scores) => {

    errorCheckObject(resultsLookup, 'resultsLookup')
    errorCheckPlayerName(playerName)
    errorCheckScores(scores, 'scores')

    const output = {...resultsLookup}
    output[playerName] = getBestScore(scores)

    return output
}