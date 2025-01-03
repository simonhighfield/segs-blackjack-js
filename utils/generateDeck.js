const generateSuit = require("./generateSuit")

module.exports = generateDeck = () => {    
    const deck = generateSuit()

    return deck
}