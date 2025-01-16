const { expectedEmblems, expectedNames, lookupValueByName, expectedValues } = require("../../data/testData");
const generateDeck = require("../../utils/gameInitialisation/generateDeck");
const generateSuit = require("../../utils/gameInitialisation/generateSuit");
const initialiseGame = require("../../utils/gameInitialisation/initialiseGame");

describe("generateSuit", () => {
    let suit = []
    const emblem = 'hearts'
    beforeAll(() => {
        suit = generateSuit(emblem);
    });

    describe("Returns a suit as an array", () => {
        test("A suit is an array", () => {
            expect(suit).toBeArray();
        });
    })

    describe("Each item is a valid card object", () => {
        test("Each card is an object", () => {
            for (let i = 0; i < suit.length; i++) { 
                const card = suit[i]            

                expect(card).toBeObject();
            }
        });

        describe("Card Emblem", () => {
            test("Each card has an emblem", () => {
                for (let i = 0; i < suit.length; i++) { 
                    const card = suit[i]                

                    expect(card).toHaveProperty('emblem');
                }
            });
            test("Each card's emblem is one of clubs, diamonds, hearts, spades", () => {
                for (let i = 0; i < suit.length; i++) { 
                    const card = suit[i]

                    expect(card.emblem).toBeOneOf(expectedEmblems);
                }
            });
        })

        describe("Card Name", () => {
            test("Each card has a name", () => {
                for (let i = 0; i < suit.length; i++) { 
                    const card = suit[i]

                    expect(card).toHaveProperty('name');
                }
            });
            test("Each card's name is a string such as Ace, Two, Jack, etc", () => {
                for (let i = 0; i < suit.length; i++) { 
                    const card = suit[i]

                    expect(card.name).toBeOneOf(expectedNames);
                }
            });
        })
        
        describe("Card Value", () => {
            test("Each card's values are in a valid array", () => {
                for (let i = 0; i < suit.length; i++) { 
                    const card = suit[i]
                    expect(card).toHaveProperty('values');
                    expect(card.values).toBeArray();
                    expect(card.values.length).toBeWithin(1,3)
                }
            });
            test("Each card's values are between 1 and 11 ", () => {
                for (let i = 0; i < suit.length; i++) { 
                    const card = suit[i]
                    const values = card.values

                    values.forEach(value => {
                        expect(value).toBeNumber()
                        expect(value).not.toBeNaN()
                        expect(value).toBeWithin(1,12)
                    });
                }
            });
            test("Each card's values must be [1, 11] or [2-10]", () => {
                for (let i = 0; i < suit.length; i++) { 
                    const card = suit[i]
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

    describe("Generates a suit ranging from Ace to King, of matching emblem", () => {
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
    let deck = []
    beforeAll(() => {
        deck = generateDeck();
    });

    describe("Returns a deck as an array", () => {
        test("A deck is an array of 52 cards", () => {
            expect(deck).toBeArrayOfSize(52);
        })
    });

    describe("Each item is a valid card object", () => {
        test("Each card has a key for emblem, name, and values", () => {
            for (let i = 0; i < deck.length; i++) { 
                const card = deck[i]            

                expect(card).toMatchObject({
                    emblem: expect.toBeOneOf(expectedEmblems),
                    name: expect.toBeOneOf(expectedNames),
                    values: expect.toBeOneOf(expectedValues)
                });
            }
        });
    })

    describe("Generates a deck containg every combination of embem and name / values", () => {
        test("A deck contains 13 cards of each emblem", () => {
            expectedEmblems.forEach(emblem => {
                const suit = deck.filter((card) => card.emblem === emblem)

                expect(suit.length).toBe(13)
            });                
        });
        test("A deck contains 4 cards of each name", () => {
            expectedNames.forEach(name => {
                const cardsOfMatchingName = deck.filter((card) => card.name === name)
                
                expect(cardsOfMatchingName.length).toBe(4)
            });                
        });
        test("A deck contains 4 cards of each values", () => {
            const aces = deck.filter((card) => `${card.values}` === `${[1, 11]}`)

            const cardsOfValuesEqualsTen = deck.filter((card) => `${card.values}` === `${[10]}`)

            const cardsOfValuesEqualsAnythingElse = deck.filter((card) => `${card.values}` !== `${[10]}` && `${card.values}` !== `${[1, 11]}`)
                
            expect(aces.length).toBe(4)
            expect(cardsOfValuesEqualsTen.length).toBe(16)
            expect(cardsOfValuesEqualsAnythingElse.length).toBe(32)
        });
    })
    

    
});
// returns an objecting keys (delaersHand, deck, playersHand)
// each key is an array 

describe("\n initialiseGame", () => {

    describe("Returns the deck, dealer's hand, player's hand, and results lookup", () => {
        let output = {}
        beforeAll(() => {
            output = initialiseGame()
        });

        test("Returns an object", () => {        

            expect(output).toBeObject()
        })

        test("Object has keys for deck, dealersHand, playersHand", () => {        
            const expectedKeys = ['deck', 'dealersHand', 'playersHand', 'resultsLookup']
                
            expect(output).toContainKeys(expectedKeys)
        })

        test("deck, dealersHand, and playersHand are arrays", () => {  
            
            expect(output.deck).toBeArray()
            expect(output.dealersHand).toBeArray()
            expect(output.playersHand).toBeArray()
            
        })

        test("resultsLookup is an object", () => {  
            
            expect(output.resultsLookup).toBeObject()  
        })
    })

    describe("Correctly deals the first 4 cards from deck to playersHand and dealersHand", () => {
        test("For a 1 player game, the first card is dealt to the player and removed from the deck", () => {        
            const expectedFirstCardDealt = { "emblem": "clubs", "name": "Ace", "values": [1, 11] }
            
            const { playersHand, deck} = initialiseGame();
    
            expect(playersHand).toContainEqual(expectedFirstCardDealt)
            expect(deck).not.toContainEqual(expectedFirstCardDealt)
        });
    
        test("For a 1 player game, the second card is dealt to the dealer and removed from the deck", () => {        
            const expectedSecondCardDealt = { "emblem": "clubs", "name": "Two", "values": [2] }
            
            const { dealersHand, deck} = initialiseGame();
    
            expect(dealersHand).toContainEqual(expectedSecondCardDealt)
            expect(deck).not.toContainEqual(expectedSecondCardDealt)
        });
    
        test("For a 1 player game, the third card is dealt to the player and removed from deck", () => {        
            const expectedThirdCardDealt = { "emblem": "clubs", "name": "Three", "values": [3] }
            
            const { playersHand, deck} = initialiseGame();
    
            expect(playersHand).toContainEqual(expectedThirdCardDealt)
            expect(deck).not.toContainEqual(expectedThirdCardDealt)
        });
    
        test("For a 1 player game, the fourth card is dealt to the dealer and removed from deck", () => {        
            const expectedFourthCardDealt = { "emblem": "clubs", "name": "Four", "values": [4] }
            
            const { dealersHand, deck} = initialiseGame();
    
            expect(dealersHand).toContainEqual(expectedFourthCardDealt)
            expect(deck).not.toContainEqual(expectedFourthCardDealt)
        });
    });

    describe("Correctly gets the dealer's score and adds it to the results lookup", () => {
        test("For a 1 player game, the dealer's score is the second + fourth cards", () => {        
            const expectedResultsLookup = {'dealer': 6}
            
            const { resultsLookup } = initialiseGame();
    
            expect(resultsLookup).toEqual(expectedResultsLookup)
        });
    });
});