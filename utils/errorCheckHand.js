const errorCheckArray = require("./errorCheckArray");
const { undefined } = require("./getScoresFromHand");

function errorCheckHand(inputHand) {
    errorCheckArray(inputHand, 'hand');

    inputHand.forEach(card => {
        if (card.emblem === undefined || card.name === undefined || card.values === undefined) {
            throw new TypeError("'hand' should contain valid card objects");
        }
    });
}
exports.errorCheckHand = errorCheckHand;
