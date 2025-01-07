module.exports = dealCard = (deck, hand) => {
    const newDeck = [...deck]
    const newHand = [...hand]
    
    newDeck.shift()

    return { newDeck, newHand }
}