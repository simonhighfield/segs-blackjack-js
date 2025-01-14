const errorCheckObject = require("../errorChecks/errorCheckObject")
const errorCheckString = require("../errorChecks/errorCheckString")
const errorCheckScores = require("../errorChecks/errorCheckScores")
const getBestScore = require("./getBestScore")

module.exports = updateResultsLookup = (resultsLookup, playerName, scores) => {

    errorCheckObject(resultsLookup, 'resultsLookup')
    errorCheckString(playerName, 'playerName')
    errorCheckScores(scores, 'scores')

    const output = {...resultsLookup}
    output[playerName] = getBestScore(scores)

    return output
}