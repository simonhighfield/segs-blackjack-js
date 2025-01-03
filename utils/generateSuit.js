const { cardNames } = require("../data/cardData")
const getCardValue = require("./getCardValue")

module.exports = generateSuit = () => {
    const suit = []
    for (let i = 0; i < 13; i++) {
        suit.push({
            suit: "clubs",
            name: cardNames[i],
            values: getCardValue(cardNames, i)
        })
    }

    return suit
}