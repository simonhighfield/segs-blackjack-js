const generateSuit = require("./generateSuit")

module.exports = generateDeck = () => {

    const emblems = ['clubs', 'diamonds', 'hearts', 'spades']

    let deck = []
    emblems.forEach((emblem) => {
        const suit = generateSuit(emblem)
        deck = [...deck, ...suit] 
    })
    
    return deck
}