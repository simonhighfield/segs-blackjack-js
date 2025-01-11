const errorCheckPlayerName = require("./errorCheckPlayerName")
const errorCheckHand = require("./errorCheckHand")
const errorCheckScores = require("./errorCheckScores")

module.exports = submitScores = (playerName, hand, scores) => {

    errorCheckPlayerName(playerName)
    errorCheckHand(hand)
    errorCheckScores(scores)

    
}