const generateDeck = require("../utils/generateDeck");
const generateSuit = require("../utils/generateSuit");

describe("generateDeck() of cards", () => {
    describe.skip("Deck properties", () => {
        test("Deck contains 52 items", () => {
          const deck = generateDeck();
          expect(deck.length).toBe(52);
        });
    })

    describe("Card properties", () => {
        test("A card is an object", () => {
            const deck = generateDeck();
            const card = deck[0]
            expect(typeof card).toBe('object');
        });
        describe("Card suit", () => {
            test("A card has a suit", () => {
                const deck = generateDeck();
                const card = deck[0]
                expect(card).toHaveProperty('suit');
            });
            test("A card's suit is one of clubs, diamonds, hearts, spades", () => {
                const deck = generateDeck();
                const card = deck[0]
                expect(card.suit).toBeOneOf(['clubs', 'diamonds', 'hearts', 'spades']);
            });
        })
        describe("Card values", () => {
            test("A card's values are in a valid array", () => {
                const deck = generateDeck();
                const card = deck[0]
                expect(card).toHaveProperty('values');
                expect(card.values).toBeArray();
                expect(card.values.length).toBeWithin(1,3)
            });
            test("A card's values are between 1 and 11 ", () => {
                const deck = generateDeck();
                const card = deck[0]
                const values = card.values
        
                values.forEach(value => {
                    expect(value).toBeNumber()
                    expect(value).not.toBeNaN()
                    expect(value).toBeWithin(1,12)
                });
            });
        })
        describe("Card name", () => {
            test("A card has a name", () => {
                const deck = generateDeck();
                const card = deck[0]
                expect(card).toHaveProperty('name');
            });
            test("A card's name is a string such as Ace, Two, Three, Jack, ... etc", () => {
                const deck = generateDeck();
                const card = deck[0]
                const validNames = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']

                expect(card.name).toBeOneOf(validNames);
            });
        })
    })
    describe("Suit Properties", () => {
        test("A suit is an array of 13 cards", () => {
            const suit = generateSuit();
            expect(suit).toBeArrayOfSize(13);
        });
    })
});