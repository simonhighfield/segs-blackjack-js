module.exports = generateSuit = () => {
    const cardNames = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']

    const suit = []
    for (let i = 0; i < 13; i++) {

        const card = {}
        card.name = cardNames[i]
        card.suit = "clubs"
        
        if (cardNames[i] === "Ace") {
            card.values = [1,11]
        } else if (cardNames[i] === 'Jack' || cardNames[i] === 'Queen' || cardNames[i] === 'King') {
            card.values = [10];
        } else {
            card.values = [i+1]
        }

        suit.push(card)
    }
    console.log(suit);
    
    return suit
}