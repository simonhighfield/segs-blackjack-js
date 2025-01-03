const getCardValue = require("./getCardValue")

module.exports = generateSuit = () => {
    const cardNames = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']

    const suit = []
    for (let i = 0; i < 13; i++) {
        suit.push({
            suit: "clubs",
            name: cardNames[i],
            values: getCardValue(i, cardNames)
        })
    }

    return suit
}