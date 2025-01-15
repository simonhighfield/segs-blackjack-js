const errorCheckObject = require("../errorChecks/errorCheckObject")
const errorCheckString = require("../errorChecks/errorCheckString")
const errorCheckScores = require("../errorChecks/errorCheckScores")
const getBestScore = require("./getBestScore")

module.exports = updateResultsLookup = (resultsLookup, playersName, scores) => {

    errorCheckObject(resultsLookup, 'resultsLookup')
    errorCheckString(playersName, 'playersName')
    errorCheckScores(scores, 'scores')

    const updatedResults = {...resultsLookup}

    const playersBestScore = getBestScore(scores)

    updatedResults[playersName] = playersBestScore

    return updatedResults
}