const generateDeck = require("../utils/generateDeck");
const generateSuit = require("../utils/generateSuit");

describe("generateDeck() of cards", () => {
    describe("Deck properties", () => {
        test("A deck is an array, with a length > 0", () => {
            const deck = generateDeck();
            
            expect(deck).toBeArray()
            expect(deck.length).toBeGreaterThan(0);
        });
    })

    describe("Card properties", () => {
        let deck = []
        beforeAll(() => {
            deck = generateDeck();
        });

        test("A card is an object", () => {
            for (let i = 0; i < deck.length; i++) { 
                const card = deck[i]                
                expect(typeof card).toBe('object');
            }
        });
        describe("Card suit", () => {
            test("A card has a suit", () => {
                for (let i = 0; i < deck.length; i++) {
                    const card = deck[i]                    
                    expect(card).toHaveProperty('suit');
                }
            });
            test("A card's suit is one of clubs, diamonds, hearts, spades", () => {
                for (let i = 0; i < deck.length; i++) { 
                    const card = deck[i]
                    expect(card.suit).toBeOneOf(['clubs', 'diamonds', 'hearts', 'spades']);
                }
            });
        })
        describe("Card values", () => {
            test("A card's values are in a valid array", () => {
                for (let i = 0; i < deck.length; i++) { 
                    const card = deck[i]
                    expect(card).toHaveProperty('values');
                    expect(card.values).toBeArray();
                    expect(card.values.length).toBeWithin(1,3)
                }
            });
            test("A card's values are between 1 and 11 ", () => {
                for (let i = 0; i < deck.length; i++) { 
                    const card = deck[i]
                    const values = card.values

                    values.forEach(value => {
                        expect(value).toBeNumber()
                        expect(value).not.toBeNaN()
                        expect(value).toBeWithin(1,12)
                    });
                }
            });
        })
        describe("Card name", () => {
            test("A card has a name", () => {
                for (let i = 0; i < deck.length; i++) { 
                    const card = deck[i]
                    expect(card).toHaveProperty('name');
                }
            });
            test("A card's name is a string such as Ace, Two, Three, Jack, ... etc", () => {
                const validNames = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']

                for (let i = 0; i < deck.length; i++) { 
                    const card = deck[i]
                    expect(card.name).toBeOneOf(validNames);
                }
            });
        })
    })
    describe("Suit Properties", () => {
        let suit = []
        beforeAll(() => {
            suit = generateSuit();
        });

        test("A suit is an array of 13 cards", () => {
            expect(suit).toBeArrayOfSize(13);
            
        });
    })
});