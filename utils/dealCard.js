module.exports = dealCard = (deck, hand) => {
    const newDeck = [...deck]
    const newHand = [...hand]
    
    const cardDealt = newDeck.shift()
    
    newHand.push(cardDealt)

    return { newDeck, newHand }
}