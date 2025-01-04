const generateSuit = require("./generateSuit")

module.exports = generateDeck = () => {

    // pass in suit as argument
    const deck = generateSuit('clubs')

    return deck
}