const errorCheckPlayerName = require("./errorCheckPlayerName")
const errorCheckHand = require("./errorCheckHand")
const errorCheckScores = require("./errorCheckScores")
const getBestScore = require("./getBestScore")
const errorCheckObject = require("./errorCheckObject")

module.exports = updateResults = (results, playerName, scores) => {

    errorCheckObject(results)
    errorCheckPlayerName(playerName)
    errorCheckScores(scores)

    const output = {}
    output[playerName] = getBestScore(scores)

    return output
}