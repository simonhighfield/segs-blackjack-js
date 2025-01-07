const { expectedEmblems, expectedNames, lookupValueByName } = require("../data/testData");
const dealCard = require("../utils/dealCard");
const generateDeck = require("../utils/generateDeck");
const generateSuit = require("../utils/generateSuit");

describe("generateDeck() of cards", () => {
    describe("Deck is a valid array ", () => {
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
        describe("Card emblem", () => {
            test("A card has an emblem", () => {
                for (let i = 0; i < deck.length; i++) {
                    const card = deck[i]                    
                    expect(card).toHaveProperty('emblem');
                }
            });
            test("A card's emblem is one of clubs, diamonds, hearts, spades", () => {
                for (let i = 0; i < deck.length; i++) { 
                    const card = deck[i]
                    expect(card.emblem).toBeOneOf(expectedEmblems);
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
            test("A card's name is a string such as Ace, Two, Jack, etc", () => {
                for (let i = 0; i < deck.length; i++) { 
                    const card = deck[i]
                    expect(card.name).toBeOneOf(expectedNames);
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
            test("A card's values must be [1, 11] or [2-10]", () => {
                for (let i = 0; i < deck.length; i++) { 
                    const card = deck[i]
                    const values = card.values

                    if (values.length === 2) {
                        expect(values).toIncludeAllMembers([1,11])
                    } else {
                        expect(values[0]).toBeWithin(2,11)
                    }
                }
            });
        })
    })

    describe("generateSuit()", () => {
        describe("Suit Properties", () => {
            let suit = []
            const emblem = 'hearts'
            beforeAll(() => {
                suit = generateSuit(emblem);
            });
    
            test("A suit is an array of 13 cards", () => {
                expect(suit).toBeArrayOfSize(13);
                
            });
            test("A suit contains one of each card name ranging from Ace, Two, ... Queen, King", () => {
                let actualNames = []
                for (let i = 0; i < suit.length; i++) { 
                    const card = suit[i]
                    actualNames.push(card.name)  
                }
                
                expect(actualNames).toIncludeAllMembers(expectedNames)
            });
            test("A suit has card names that correspond to the correct value", () => {            
                for (let i = 0; i < suit.length; i++) { 
                    const card = suit[i];
                    expect(card.values).toEqual(lookupValueByName[card.name]);
                }
            })
            test("A suit has all cards matching the input emblem", () => {     
                for (let i = 0; i < suit.length; i++) { 
                    const card = suit[i];
                    expect(card.emblem).toBe(emblem);
                }
            })
        })
    })

    describe("generateDeck", () => {
        describe("Deck Properties", () => {
            let deck = []
            beforeAll(() => {
                deck = generateDeck();
            });
    
            test("A deck is an array of 52 cards", () => {
                expect(deck).toBeArrayOfSize(52);
            })
            test("A deck contains 13 cards of each emblem", () => {
                expectedEmblems.forEach(emblem => {
                    const suit = deck.filter((card) => card.emblem === emblem)
                    expect(suit.length).toBe(13)
                });                
            });
        })
    })
});

describe("dealCard", () => {
    test("Dealing a card returns arrays for the deck and hand", () => {
        const deck = generateDeck();
        const hand = []

        const { newDeck, newHand } = dealCard(deck, hand)

        expect(newDeck).toBeArray()
        expect(newHand).toBeArray()
    });
})