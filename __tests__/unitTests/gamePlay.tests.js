const generateDeck = require("../../utils/gameInitialisation/generateDeck");
const dealCard = require("../../utils/gamePlay/dealCard");
const getBestScore = require("../../utils/gamePlay/getBestScore");
const getHandValidityFromScores = require("../../utils/gamePlay/getHandValidityFromScores");
const getScoresFromHand = require("../../utils/gamePlay/getScoresFromHand");
const nextPlay = require("../../utils/gamePlay/nextPlay");
const updateResultsLookup = require("../../utils/gamePlay/updateResultsLookup");

describe("dealCard", () => {
    let deck, hand;
    beforeEach(() => {
        deck = generateDeck();
        hand = [];
    });

    describe("Is a pure function", () => {
        test("Returns arrays for the deck and hand", () => {
            const { newDeck, newHand } = dealCard(deck, hand)
    
            expect(newDeck).toBeArray()
            expect(newHand).toBeArray()
        });
    
        test("Returns new arrays, rather than references to the input arrays", () => {
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
    })

    describe("Deals a card", () => {
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

})



describe("getScoresFromHand", () => {
    describe("Error checks the input hand", () => {
        test("Throws an error if missing an input", () => {        
            function getScoresFromMissingInput () {
                getScoresFromHand()
            }
            expect(getScoresFromMissingInput).toThrow("'hand' must be provided");
        });

        test("Throws an error if 'hand' is not an array", () => {        
            function getScoresFromWrongInputType () {
                getScoresFromHand('shouldBeArray')
            }
            expect(getScoresFromWrongInputType).toThrow("'hand' should be an array");
        });

        test("Throws an error if 'hand' is an empty array", () => {        
            function getScoresFromEmptyHand () {
                getScoresFromHand([])
            }
            expect(getScoresFromEmptyHand).toThrow("'hand' should not be empty");
        });        
    })

    describe("Error checks each card of hand", () => {
        test("Throws an error if cards are empty", () => {
            function getScoresFromEmptyCard() {
                getScoresFromHand([{}]);
            }
            expect(getScoresFromEmptyCard).toThrow("'hand' should contain valid card objects");
        });

        test("Throws an error if cards do not contain 'emblem'", () => {
            function getScoresFromCardWithoutEmblem() {
                getScoresFromHand([{ invalidEmblem: "clubs", name: "Two", values: [2] }]);
            }
            expect(getScoresFromCardWithoutEmblem).toThrow("'hand' should contain valid card objects");
        });

        test("Throws an error if cards do not contain 'name'", () => {
            function getScorsFromCardWithoutName() {
                getScoresFromHand([{ emblem: "clubs", invalidName: "Two", values: [2] }]);
            }
            expect(getScorsFromCardWithoutName).toThrow("'hand' should contain valid card objects");
        });

        test("Throws an error if cards do not contain 'values'", () => {
            function getScoresFromCardWithoutValues() {
                getScoresFromHand([{ emblem: "clubs", name: "Two", invalidValues: [2] }]);
            }
            expect(getScoresFromCardWithoutValues).toThrow("'hand' should contain valid card objects");
        });
    });
    
    describe("Is a pure function", () => {
        test("Does not mutate the input hand", () => {
            const hand = [
                { "emblem": "clubs", "name": "Two", "values": [2] },
                { "emblem": "diamonds", "name": "Four", "values": [4] }
            ]
            const handCopy = [...hand]
    
            getScoresFromHand(hand)
            expect(hand).toEqual(handCopy)
        });
    })

    describe("Returns scores as an array", () => {
        test("Returns scores as an array", () => {
            const hand = [{ "emblem": "clubs", "name": "Two", "values": [2] }]
            const scores = getScoresFromHand(hand)
    
            expect(scores).toBeArray()
        });

        test("Each score is a number", () => {
            const hand = [{ "emblem": "clubs", "name": "Two", "values": [2] }]
            const scores = getScoresFromHand(hand)
    
            scores.forEach(score => {
                expect(score).toBeNumber()
                expect(score).not.toBeNaN()
                expect(score).toBePositive()
            });
        });

    })

    describe("Calculates the possible scores", () => {
        test("Returns the score from a hand of 1 one single-value card", () => {
            const hand = [{ "emblem": "clubs", "name": "Two", "values": [2] }]
            const actualScores = getScoresFromHand(hand)
            const expectedScores = hand[0].values
            
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns the score from a hand of 2 single-value cards", () => {
            const hand = [
                { "emblem": "clubs", "name": "Two", "values": [2] },
                { "emblem": "diamonds", "name": "Four", "values": [4] }
            ]
            const actualScores = getScoresFromHand(hand)
            const expectedScores = [6]       
        
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns both scores from a hand of 1 ace card", () => {
            const hand = [{ "emblem": "clubs", "name": "Ace", "values": [1, 11] }]
            const actualScores = getScoresFromHand(hand)
            const expectedScores = [1, 11]
            
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns 2 correct scores from 1 single-value and 1 ace card", () => {
            const hand = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "clubs", "name": "Two", "values": [2] }
            ]
            const actualScores = getScoresFromHand(hand)
            const expectedScores = [3, 13]
            
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns 2 correct scores from 2 ace cards (1 ace played high)", () => {
            const hand = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            ]
            const actualScores = getScoresFromHand(hand)
            const expectedScores = [2, 12]
            
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns 2 correct scores from multiple ace and single-value cards (one ace played high)", () => {
            const hand = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
                { "emblem": "hearts", "name": "Ace", "values": [1, 11] },
                { "emblem": "spades", "name": "Ace", "values": [1, 11] },
                { "emblem": "spades", "name": "Two", "values": [2] },
                { "emblem": "spades", "name": "Three", "values": [3] },
            ]
            const actualScores = getScoresFromHand(hand)
            const expectedScores = [9, 19]
            
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns only 1 correct score if an ace played high would exceed 21", () => {
            const hand = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "spades", "name": "Four", "values": [4] },
                { "emblem": "spades", "name": "Five", "values": [5] },
                { "emblem": "spades", "name": "Six", "values": [6] },
            ]
            const actualScores = getScoresFromHand(hand)
            const expectedScores = [16]
            
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns 1 correct score if playing an ace high would exceed 21", () => {
            const hand = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
                { "emblem": "hearts", "name": "Ace", "values": [1, 11] },
                { "emblem": "spades", "name": "Ace", "values": [1, 11] },
                { "emblem": "hearts", "name": "Jack", "values": [10] },
            ]
            const actualScores = getScoresFromHand(hand)
            const expectedScores = [14]
            
            expect(actualScores).toEqual(expectedScores)
        });
    })
})



describe("getHandValidityFromScores", () => {
    describe("Error Checks", () => {
        test("Throws an error if missing an input", () => {        
            function updateWithoutInput () {
                getHandValidityFromScores()
            }
            expect(updateWithoutInput).toThrow("'scores' must be provided");
        });

        test("Throws an error if scores are not numbers", () => {
            function getHandValidityFromStringScores() {
                getHandValidityFromScores([5, 'should be a number'])
            }
            expect(getHandValidityFromStringScores).toThrow("'scores' should be numbers");
        });

        test("Throws an error if scores is less than 2 (two aces)", () => {
            function getHandValidityFromInvalidScores() {
                getHandValidityFromScores([2, -1])
            }
            expect(getHandValidityFromInvalidScores).toThrow("'scores' should be at least 2");
        });
    })

    describe("Funcitonal Checks", () => {
        test("Does not mutate the input scores", () => {
            const inputScores = [7, 17]
            const scoresCopy = [7, 17]

            getHandValidityFromScores(inputScores)
            expect(inputScores).toEqual(scoresCopy)
        });
    })

    describe("Output Checks", () => {
        test("returns validity as a boolean", () => {
            const validScores = [7, 17]

            const validity = getHandValidityFromScores(validScores)
            expect(validity).toBeBoolean()
        });
    })

    describe("Logic", () => {
        test("Returns true for single scores < 21", () => {
            const validScores = [7]

            const validity = getHandValidityFromScores(validScores)
            expect(validity).toBeTrue()
        });

        test("Returns false for single scores > 21", () => {
            const validScores = [22]

            const validity = getHandValidityFromScores(validScores)
            expect(validity).toBeFalse()
        });

        test("Returns true for two scores < 21", () => {
            const validScores = [7, 17]

            const validity = getHandValidityFromScores(validScores)
            expect(validity).toBeTrue()
        });

        test("Returns true if only one of two scores < 21", () => {
            const validScores = [17, 27]

            const validity = getHandValidityFromScores(validScores)
            expect(validity).toBeTrue()
        });
    })
})



describe("getBestScore", () => {
    describe("Error Checks", () => {
        test("Throws an error if missing an input", () => {        
            function getBestScoreWithoutInput () {
                getBestScore()
            }
            expect(getBestScoreWithoutInput).toThrow("'scores' must be provided");
        });

        test("Throws an error if scores are not numbers", () => {
            function getBestScoreFromString() {
                getBestScore([5, 'should be a number'])
            }
            expect(getBestScoreFromString).toThrow("'scores' should be numbers");
        });

        test("Throws an error if scores is less than 2 (two aces)", () => {
            function getBestScoreFromInvalidScores() {
                getBestScore([2, -1])
            }
            expect(getBestScoreFromInvalidScores).toThrow("'scores' should be at least 2");
        });

        test("Throws an error if all scores are > 21", () => {
            function getBestScoreFromInvalidScores() {
                getBestScore([22, 32])
            }
            expect(getBestScoreFromInvalidScores).toThrow("'scores' should contain at least one score < 21");
        });
    })

    describe("Funcitonal Checks", () => {
        test("Does not mutate the input scores", () => {
            const inputScores = [7, 17]
            const scoresCopy = [7, 17]

            getBestScore(inputScores)
            expect(inputScores).toEqual(scoresCopy)
        });
    })

    describe("Output Checks", () => {
        test("Returns best score as a number", () => {
            const scores = [7, 17]

            const bestScore = getBestScore(scores)
            expect(bestScore).toBeNumber()
            expect(bestScore).not.toBeNaN()
        });

        test("Score should be at least 2", () => {
            const scores = [7, 17]

            const bestScore = getBestScore(scores)
            expect(bestScore).toBeGreaterThan(1)
        });
    })

    describe("Gets the best score", () => {
        test("Returns the score from a single-value hand", () => {
            const scores = [7]

            const bestScore = getBestScore(scores)
            expect(bestScore).toBe(7)
        });

        test("Returns the highest score from a two-value hand", () => {
            const scores = [7, 17]

            const bestScore = getBestScore(scores)
            expect(bestScore).toBe(17)
        });

        test("Discards scores > 21, and returns the score < 21", () => {
            const scores1 = [21, 31]

            const bestScore1 = getBestScore(scores1)
            expect(bestScore1).toBe(21)

            const scores2 = [20, 30]

            const bestScore2 = getBestScore(scores2)
            expect(bestScore2).toBe(20)
        });

    })
})



describe("updateResultsLookup", () => {
    const resultsLookup = {dealer: 10}
    const playerName = 'player'
    const scores = [3, 13]

    describe("Error Checks", () => {        
        test("Throws an error if 'results' is not an object", () => {        
            function errorCheckInvalidResults () {
                updateResultsLookup('should be object', playerName)
            }
            expect(errorCheckInvalidResults).toThrow("'resultsLookup' should be an object");
        });

        test("Throws an error if 'playerName' is an empty string", () => {        
            function errorCheckEmptyPlayerName () {
                updateResultsLookup(resultsLookup, '')
            }
            expect(errorCheckEmptyPlayerName).toThrow("'playerName' should have length > 0");
        });
        // errorCheckScores
    })

    describe("Pure Function Checks", () => {
        test("Does not mutate the input results", () => {        
            const resultsCopy = {dealer: 10}
    
            updateResultsLookup(resultsLookup, playerName, scores)
            expect(resultsLookup).toEqual(resultsCopy);
        });

        test("Does not mutate the input scores", () => {        
            const scoresCopy = [3, 13]
    
            updateResultsLookup(resultsLookup, playerName, scores)
            expect(scores).toEqual(scoresCopy);
        });
    })

    describe("Output Checks", () => {
        test("Returns an object", () => {
            const submittedScores = updateResultsLookup(resultsLookup, playerName, scores)

            expect(submittedScores).toBeObject()
        });

        test("Returns an object containing a single input score", () => {
            const singleScore = [15]

            const actualOutput = updateResultsLookup(resultsLookup, playerName, singleScore)
            const expectedOutput = {player: 15} 

            expect(actualOutput).toMatchObject(expectedOutput)
        });

        test("Returns an object containing the best score when more than one score available (ace card present)", () => {

            const actualOutput = updateResultsLookup(resultsLookup, playerName, scores)
            const expectedOutput = {player: 13} 

            expect(actualOutput).toMatchObject(expectedOutput)
        });

        test("New scores are added to existing ones", () => {
            const actualOutput = updateResultsLookup(resultsLookup, playerName, scores)
            
            const expectedOutput = {
                dealer: 10,
                player: 13
            } 

            expect(actualOutput).toMatchObject(expectedOutput)
        });
    })
})



describe("nextPlay", () => {
    test("If input = 'hit', returns newDeck and newHand", () => {
        const deck = [
            { "emblem": "hearts", "name": "Ace", "values": [1, 11] },
            { "emblem": "spades", "name": "Ace", "values": [1, 11] },
        ]
        const hand = [
            { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
            { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
        ]
        const {newDeck, newHand } = nextPlay('hit', deck, hand)

        expectedNewDeck = [
            { "emblem": "spades", "name": "Ace", "values": [1, 11] }
        ]
        expectedNewHand = [
            { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
            { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            { "emblem": "hearts", "name": "Ace", "values": [1, 11] },
        ]

        expect(newDeck).toEqual(expectedNewDeck)
        expect(newHand).toEqual(expectedNewHand)
    })
})