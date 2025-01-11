const errorCheckPlayerName = require("./errorCheckPlayerName")
const errorCheckHand = require("./errorCheckHand")
const errorCheckScores = require("./errorCheckScores")

module.exports = updatePlayerResults = (playerName, scores) => {

    errorCheckPlayerName(playerName)
    errorCheckScores(scores)

    const output = {}
    output[playerName] = scores[0]

    return output
}