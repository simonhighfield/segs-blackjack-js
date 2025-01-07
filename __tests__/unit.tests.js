const { expectedEmblems, expectedNames, lookupValueByName, expectedDeck } = require("../data/testData");
const dealCard = require("../utils/dealCard");
const generateDeck = require("../utils/generateDeck");
const generateSuit = require("../utils/generateSuit");
const updateScore = require("../utils/updateScore");

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
    let deck, hand;
    beforeEach(() => {
        deck = generateDeck();
        hand = [];
    });

    test("Returns arrays for the deck and hand", () => {
        const { newDeck, newHand } = dealCard(deck, hand)

        expect(newDeck).toBeArray()
        expect(newHand).toBeArray()
    });
    test("Returns new arrays, as oppose to references to the input arrays", () => {
        const { newDeck, newHand } = dealCard(deck, hand)

        expect(newDeck).not.toBe(deck)
        expect(newHand).not.toBe(hand)
    });
    test("Does not mutate the input arrays", () => {
        const deckCopy = [...deck]
        const handCopy = [...hand]

        dealCard(deck, hand)
        expect(deck).toEqual(deckCopy)
        expect(hand).toEqual(handCopy)
    });
    test("Removes the first card from the deck", () => {
        let { newDeck } = dealCard(deck, hand)
        const expectedCardDealt = deck[0]

        expect(newDeck.length).toBe(51)
        expect(newDeck).not.toPartiallyContain(expectedCardDealt)
    });
    test("Adds the first card from deck to the hand", () => {
        let { newHand } = dealCard(deck, hand)
        let expectedCardDealt = deck[0]
        
        expect(newHand.length).toBe(1)
        expect(newHand).toIncludeAllMembers([expectedCardDealt])
    });
    test("Consecutively removes the front card from the deck", () => {
        let { newHand, newDeck } = dealCard(deck, hand)
        const expectedCardsDealt = deck.slice(0,2)
        
        hand = newHand;
        deck = newDeck;
        ({ newDeck } = dealCard(deck, hand))
    
        expect(newDeck.length).toBe(50)
        expect(newHand).not.toIncludeAllMembers(expectedCardsDealt)
    });
    test("Consecutively adds the front card from the deck to the hand", () => {
        
        let { newHand, newDeck } = dealCard(deck, hand)
        const expectedCardsDealt = deck.slice(0,2)
        
        hand = newHand;
        deck = newDeck;
        ({ newHand } = dealCard(deck, hand))      
    
        expect(newHand.length).toBe(2)
        expect(newHand).toIncludeAllMembers(expectedCardsDealt)
    });
})

describe("updateScore", () => {
    let deck, hand;
    let score = 0
    beforeEach(() => {
        deck = generateDeck();
        hand = []
        
        let { newHand, newDeck } = dealCard(deck, hand)
        hand = newHand;
        deck = newDeck;
        
        ({ newDeck, newHand } = dealCard(deck, hand))
        hand = newHand;
        deck = newDeck;
    });

    describe("Error checks", () => {
        test("Throws an error if missing an input", () => {        
            function updateWithoutInputs () {
                updateScore()
            }
            expect(updateWithoutInputs).toThrow("both 'hand' and 'score' must be provided");
    
            function updateWithoutScore () {
                updateScore()
            }
            expect(updateWithoutScore).toThrow("both 'hand' and 'score' must be provided");
        });
        test("Throws an error if 'hand' is not an array", () => {        
            function updatedWithWrongTypes () {
                updateScore('shouldBeArray', 1)
            }
            expect(updatedWithWrongTypes).toThrow("'hand' should be an array");
        });
        test("Throws an error if 'score' is not a number", () => {        
            function updatedWithWrongTypes () {
                updateScore([1], 'shouldBeNumber')
            }
            expect(updatedWithWrongTypes).toThrow("'score' should be a number");
        });
        test("Throws an error if 'hand' is an empty array", () => {        
            function inputEmptyHand () {
                updateScore([], 1)
            }
            expect(inputEmptyHand).toThrow("'hand' should not be empty");
        });
        test("Throws an error if 'score' is less than 0", () => {        
            function inputNegativeScore () {
                updateScore([1], -1)
            }
            expect(inputNegativeScore).toThrow("'score' should not be negative");
        });
    })

    describe("Functional checks", () => {
        test("Returns a number", () => {
            const score = updateScore([1], 1)
    
            expect(score).toBeNumber()
            expect(score).not.toBeNaN()
        });
        test("Does not mutate the input hand", () => {
            const hand = [1, 2]
            const handCopy = [...hand]
    
            updateScore(hand, 3)
            expect(hand).toEqual(handCopy)
        });

    })
})