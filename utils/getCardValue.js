module.exports = getCardValue = (i, cardNames) => {
    if (cardNames[i] === "Ace") {
        return [1, 11];
    } else if (cardNames[i] === 'Jack' || cardNames[i] === 'Queen' || cardNames[i] === 'King') {
        return [10];
    } else {
        return [i + 1];
    }
}
