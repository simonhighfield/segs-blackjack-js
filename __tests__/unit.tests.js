const generateDeck = require("../utils/generateDeck");

describe("generateDeck()", () => {
    test("Deck contains 52 items", () => {
      const deck = generateDeck();
      expect(deck.length).toBe(52);
    });
    test("A card is an object", () => {
        const deck = generateDeck();
        const card = deck[0]
        expect(typeof card).toBe('object');
    });
    // A card has a valid suit and a value
    // Every card
    // Each suit contains ace, 2-10, 3 * royals
  });