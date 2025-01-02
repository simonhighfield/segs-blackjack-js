const generateDeck = require("../utils/generateDeck");

describe("generateDeck()", () => {
    test("Deck contains 52 cards", () => {

      const deck = generateDeck();
      expect(deck.length).toBe(52);
    });
    // A card is an object
    // A card has a valid suit and a value
    // Every card
    // Each suit contains ace, 2-10, 3 * royals
  });