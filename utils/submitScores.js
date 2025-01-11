const errorCheckPlayerName = require("./errorCheckPlayerName")
const errorCheckHand = require("./errorCheckHand")
const errorCheckScores = require("./errorCheckScores")

module.exports = submitScores = (playerName, scores) => {

    errorCheckPlayerName(playerName)
    errorCheckScores(scores)

    return {}
}