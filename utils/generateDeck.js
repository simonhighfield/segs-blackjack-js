module.exports = generateDeck = () => {
    const deck = new Array(52)

    deck[0] = {
        "suit": "clubs",
        "values": [1, 3]
    }

    return deck
}