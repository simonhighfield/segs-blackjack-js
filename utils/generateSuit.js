module.exports = generateSuit = () => {
    const exampleCard = {
        "suit": "clubs",
        "values": [1, 11],
        "name": 'Ace'
    }
    
    const suit = []
    for (let i = 0; i < 13; i++) {
        suit.push(exampleCard)
    }

    return suit
}