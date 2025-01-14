const { expectedEmblems, expectedNames, lookupValueByName, expectedDeck } = require("../../data/testData");
const generateDeck = require("../../utils/gameInitialisation/generateDeck");
const generateSuit = require("../../utils/gameInitialisation/generateSuit");
const initialiseGame = require("../../utils/gameInitialisation/initialiseGame");

describe("generateDeck", () => {
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

    describe("\n generateSuit", () => {
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

    describe("\n generateDeck", () => {
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


describe("\n initialiseGame", () => {
    test("For a 1 player game, the second card is dealt to the dealer and removed from the deck", () => {        
        const { dealerHand, deck} = initialiseGame();
        
        const expectedSecondCardDealt = { "emblem": "clubs", "name": "Two", "values": [2] }

        expect(dealerHand).toContainEqual(expectedSecondCardDealt)
        expect(deck).not.toContainEqual(expectedSecondCardDealt)
    });

    test("For a 1 player game, the third card is dealt to the player and removed from deck", () => {        
        const { playerHand, deck} = initialiseGame();
        
        const expectedThirdCardDealt = { "emblem": "clubs", "name": "Three", "values": [3] }

        expect(playerHand).toContainEqual(expectedThirdCardDealt)
        expect(deck).not.toContainEqual(expectedThirdCardDealt)
    });

    test("For a 1 player game, the fourth card is dealt to the dealer and removed from deck", () => {        
        const { dealerHand, deck} = initialiseGame();
        
        const expectedFourthCardDealt = { "emblem": "clubs", "name": "Four", "values": [4] }

        expect(dealerHand).toContainEqual(expectedFourthCardDealt)
        expect(deck).not.toContainEqual(expectedFourthCardDealt)
    });

    test("Returns the results containg the dealers score from their two cards", () => {        
        const { resultsLookup } = initialiseGame();
        
        const expectedResultsLookup = {'dealer': 6}

        expect(resultsLookup).toEqual(expectedResultsLookup)
    });
});