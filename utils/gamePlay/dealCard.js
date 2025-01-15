const errorCheckArray = require("../errorChecks/errorCheckArray")
const errorCheckCardArray = require("../errorChecks/errorCheckCardArray")

module.exports = dealCard = (deck, hand) => {
    errorCheckCardArray(deck, 'deck')
    errorCheckCardArray(hand, 'hand')

    const newDeck = [...deck]
    const newHand = [...hand]
    
    const cardDealt = newDeck.shift()
    
    newHand.push(cardDealt)

    return { newDeck, newHand }
}