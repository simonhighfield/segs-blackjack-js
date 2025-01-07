const fs = require('node:fs');
const generateDeck = require("../utils/generateDeck");

const deck = generateDeck()
const deckJSON = JSON.stringify(deck)
const fileContents = 'module.exports = testDeck = ' + deckJSON

try {
    fs.writeFileSync('./data/testDeck.js', fileContents)
} catch (error) {
    console.error(error);
}