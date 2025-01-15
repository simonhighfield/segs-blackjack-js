const errorCheckArray = require("../errorChecks/errorCheckArray")
const errorCheckHand = require("../errorChecks/errorCheckHand")

module.exports = dealCard = (deck, hand) => {
    // errorCheckHand(hand)
    // errorCheckArray(deck)

    const newDeck = [...deck]
    const newHand = [...hand]
    
    const cardDealt = newDeck.shift()
    
    newHand.push(cardDealt)

    return { newDeck, newHand }
}