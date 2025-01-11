const dealCard = require("./dealCard")
const generateDeck = require("./generateDeck")

module.exports = initialiseGame = () => {

    const deck = generateDeck()
    const playerHand = []
    const dealerHand = []

    dealCard(deck, playerHand)

}