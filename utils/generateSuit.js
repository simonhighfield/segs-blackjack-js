module.exports = generateSuit = () => {
    const cardNames = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']

    const suit = []
    for (let i = 0; i < 13; i++) {
        suit.push({
            "name": cardNames[i],
            "values": [2],
            "suit": "clubs"
        })
    }

    return suit
}