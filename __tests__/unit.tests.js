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
    test("A card has a valid suit", () => {
        const deck = generateDeck();
        const card = deck[0]
        expect(card).toHaveProperty('suit');
        expect(card.suit).toBeOneOf(['clubs', 'diamonds', 'hearts', 'spades']);
    });
    test("A card has a valid array of values", () => {
        const deck = generateDeck();
        const card = deck[0]
        expect(card).toHaveProperty('values');
        expect(card.values).toBeArray();

        const values = card.values
        expect(values.length).toBeWithin(1,3)

        values.forEach(value => {
            expect(value).toBeNumber()
            expect(value).not.toBeNaN()
            expect(value).toBeWithin(1,12)
        });
    });
    // A card has a valid suit, value, name
    // Every card is an object with valid suit and value
    // Each suit contains ace, 2-10, 3 * royals
  });