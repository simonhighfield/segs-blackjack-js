const errorCheckArray = require("./errorCheckArray");

module.exports = errorCheckCardArray = (cardArray, arrayName = 'cardArray') => {
    errorCheckArray(cardArray, arrayName);

    cardArray.forEach(card => {
        if (card.emblem === undefined || card.name === undefined || card.values === undefined) {
            throw new TypeError(`'${arrayName}' should contain valid card objects`);
        }
    });
}