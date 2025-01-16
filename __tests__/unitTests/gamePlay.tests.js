const generateDeck = require("../../utils/gameInitialisation/generateDeck");
const dealCard = require("../../utils/gamePlay/dealCard");
const getBestScore = require("../../utils/gamePlay/getBestScore");
const getHandValidityFromScores = require("../../utils/gamePlay/getHandValidityFromScores");
const getPossibleScoresFromHand = require("../../utils/gamePlay/getPossibleScoresFromHand");
const nextPlay = require("../../utils/gamePlay/nextPlay");
const updateResultsLookup = require("../../utils/gamePlay/updateResultsLookup");

describe("dealCard", () => {
    let deck, hand;
    beforeEach(() => {
        deck = generateDeck();
        hand = [];
    });

    describe("Is a pure function", () => {
        test("Does not mutate the input arrays", () => {
            const deckCopy = [...deck]
            const handCopy = [...hand]
    
            dealCard(deck, hand)
            expect(deck).toEqual(deckCopy)
            expect(hand).toEqual(handCopy)
        });
    })
    describe("Returns a deck and hand as arrays", () => {
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
    })

    describe("Deals a card from the deck to the players hand", () => {
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



describe("\n getPossibleScoresFromHand", () => {    
    describe("Is a pure function", () => {
        test("Does not mutate the input hand", () => {
            const hand = [
                { "emblem": "clubs", "name": "Two", "values": [2] },
                { "emblem": "diamonds", "name": "Four", "values": [4] }
            ]
            const handCopy = [...hand]
    
            getPossibleScoresFromHand(hand)

            expect(hand).toEqual(handCopy)
        });
    })

    describe("Returns the possible scores as an array", () => {
        test("Returns scores as an array of numbers", () => {
            const hand = [{ "emblem": "clubs", "name": "Two", "values": [2] }]
            const scores = getPossibleScoresFromHand(hand)
    
            expect(scores).toBeArray()
        });

        test("Each score is a number", () => {
            const hand = [{ "emblem": "clubs", "name": "Two", "values": [2] }]

            const scores = getPossibleScoresFromHand(hand)
    
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
            const expectedScores = [2]
            
            const actualScores = getPossibleScoresFromHand(hand)
            
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns the score from a hand of 2 single-value cards", () => {
            const hand = [
                { "emblem": "clubs", "name": "Two", "values": [2] },
                { "emblem": "diamonds", "name": "Four", "values": [4] }
            ]
            const expectedScores = [6]       

            const actualScores = getPossibleScoresFromHand(hand)
        
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns both scores from a hand of 1 ace card", () => {
            const hand = [{ "emblem": "clubs", "name": "Ace", "values": [1, 11] }]
            const expectedScores = [1, 11]

            const actualScores = getPossibleScoresFromHand(hand)
            
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns 2 correct scores from 1 single-value and 1 ace card", () => {
            const hand = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "clubs", "name": "Two", "values": [2] }
            ]
            const expectedScores = [3, 13]
            
            const actualScores = getPossibleScoresFromHand(hand)
            
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns 2 correct scores from 2 ace cards (1 ace played high)", () => {
            const hand = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            ]
            const expectedScores = [2, 12]
            
            const actualScores = getPossibleScoresFromHand(hand)
            
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
            const expectedScores = [9, 19]
            
            const actualScores = getPossibleScoresFromHand(hand)
            
            expect(actualScores).toEqual(expectedScores)
        });

        test("Returns only 1 correct score if an ace played high would exceed 21", () => {
            const hand = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "spades", "name": "Four", "values": [4] },
                { "emblem": "spades", "name": "Five", "values": [5] },
                { "emblem": "spades", "name": "Six", "values": [6] },
            ]
            const expectedScores = [16]
            
            const actualScores = getPossibleScoresFromHand(hand)
            
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
            const expectedScores = [14]
            
            const actualScores = getPossibleScoresFromHand(hand)
            
            expect(actualScores).toEqual(expectedScores)
        });
    })
})



describe("\n getHandValidityFromScores", () => {
    describe("Is a pure function", () => {
        test("Does not mutate the input scores", () => {
            const inputScores = [7, 17]
            const scoresCopy = [7, 17]

            getHandValidityFromScores(inputScores)

            expect(inputScores).toEqual(scoresCopy)
        });
    })

    describe("Returns a boolean", () => {
        test("Returns the hand's validity as a boolean", () => {
            const validScores = [7, 17]

            const validity = getHandValidityFromScores(validScores)

            expect(validity).toBeBoolean()
        });
    })

    describe("Gets the hand validity by checking if any of the possible scores are <= 21", () => {
        test("Returns true for 1 score < 21", () => {
            const validScores = [7]

            const validity = getHandValidityFromScores(validScores)

            expect(validity).toBeTrue()
        });

        test("Returns false for 1 score > 21", () => {
            const validScores = [22]

            const validity = getHandValidityFromScores(validScores)

            expect(validity).toBeFalse()
        });

        test("Returns true for 2 scores < 21", () => {
            const validScores = [7, 17]

            const validity = getHandValidityFromScores(validScores)

            expect(validity).toBeTrue()
        });

        test("Returns true if 1 of 2 scores < 21", () => {
            const validScores = [17, 27]

            const validity = getHandValidityFromScores(validScores)

            expect(validity).toBeTrue()
        });
    })
})



describe("\n getBestScore", () => {
    describe("Is a pure function", () => {
        test("Does not mutate the input scores", () => {
            const inputScores = [7, 17]
            const scoresCopy = [7, 17]

            getBestScore(inputScores)

            expect(inputScores).toEqual(scoresCopy)
        });
    })

    describe("Returns the score as a valid number", () => {
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

    describe("Gets the best score <= 21 ", () => {
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



describe("\n updateResultsLookup", () => {
    const resultsLookup = {dealer: 10}
    const playersName = 'player'
    const scores = [3, 13]

    describe("Invokes error check functions", () => {        
        test("Throws an error if 'resultsLookup' is not an object", () => {        
            function errorCheckInvalidResults () {
                updateResultsLookup('should be object', playersName)
            }
            expect(errorCheckInvalidResults).toThrow("'resultsLookup' should be an object");
        });

        test("Throws an error if 'playersName' is an empty string", () => {        
            function errorCheckEmptyplayersName () {
                updateResultsLookup(resultsLookup, '')
            }
            expect(errorCheckEmptyplayersName).toThrow("'playersName' should have length > 0");
        });
    })

    describe("Is a pure function", () => {
        test("Does not mutate the input results", () => {        
            const resultsCopy = {dealer: 10}
    
            updateResultsLookup(resultsLookup, playersName, scores)

            expect(resultsLookup).toEqual(resultsCopy);
        });
    })

    describe("Returns a valid object", () => {
        test("Returns an object", () => {
            const submittedScores = updateResultsLookup(resultsLookup, playersName, scores)

            expect(submittedScores).toBeObject()
        });
        
        test("Returns an object that is not empty", () => {        
            const returnedLookup = updateResultsLookup(resultsLookup, playersName, scores)

            expect(returnedLookup).not.toBeEmptyObject()
        });
        
        test("Returns a new object rather than a reference to the input", () => {        
            const returnedLookup = updateResultsLookup(resultsLookup, playersName, scores)

            expect(returnedLookup).not.toBe(resultsLookup)
        });
    })

    describe("Updates the results lookup with the player's name and score", () => {
        test("Returns include the player's name and score as a key-value pair, when input 1 possible score (no ace cards present)", () => {
            const singleScore = [15]
            const expectedOutput = {player: 15} 

            const actualOutput = updateResultsLookup(resultsLookup, playersName, singleScore)

            expect(actualOutput).toMatchObject(expectedOutput)
        });

        test("Returns include the player's name and their best possible score as a key-value pair, when input with 2 possible scores (ace cards present)", () => {
            const expectedOutput = {player: 13} 

            const actualOutput = updateResultsLookup(resultsLookup, playersName, scores)

            expect(actualOutput).toMatchObject(expectedOutput)
        });

        test("Retains scores that were already in the lookup ", () => {
            const expectedOutput = {
                dealer: 10,
                player: 13
            } 
            
            const actualOutput = updateResultsLookup(resultsLookup, playersName, scores)

            expect(actualOutput).toMatchObject(expectedOutput)
        });
    })
})



describe("\n nextPlay", () => {

    describe("if input === 'hit'", () => {
        test("Deals a card and returns newDeck and newHand", () => {
            const deck = [
                { "emblem": "hearts", "name": "Ace", "values": [1, 11] },
                { "emblem": "spades", "name": "Ace", "values": [1, 11] },
            ]
            const hand = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            ]
            
            expectedNewDeck = [
                { "emblem": "spades", "name": "Ace", "values": [1, 11] }
            ]
            expectedNewHand = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
                { "emblem": "hearts", "name": "Ace", "values": [1, 11] },
            ]
            
            const {newDeck, newHand } = nextPlay('hit', deck, hand)
            
            expect(newDeck).toEqual(expectedNewDeck)
            expect(newHand).toEqual(expectedNewHand)
        })

        test("Does not mutate the input arrays", () => {
            const deck = [
                { "emblem": "hearts", "name": "Ace", "values": [1, 11] },
                { "emblem": "spades", "name": "Ace", "values": [1, 11] },
            ]
            const deckCopy = [
                { "emblem": "hearts", "name": "Ace", "values": [1, 11] },
                { "emblem": "spades", "name": "Ace", "values": [1, 11] },
            ]
            const hand = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            ]
            const handCopy = [
                { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            ]

            nextPlay('hit', deck, hand)

            expect(deck).toEqual(deckCopy)
            expect(hand).toEqual(handCopy)
        })

    })

    describe("if input === 'stand'", () => {
        test("the resultsLookup is updated and returned", () => {
            const resultsLookup = {dealer: 10}
            const playersName = 'player'
            const playersScores = [5, 15]
            const expectedResultsLookup = {dealer: 10, player: 15}
    
            const updatedResultsLookup = nextPlay('stand', undefined, undefined, resultsLookup, playersName, playersScores)
    
            expect(updatedResultsLookup).toEqual(expectedResultsLookup)
        })

        test("Does not reassign or mutate the inputs", () => {
            const resultsLookup = {dealer: 10}
            const resultsLookupCopy = {dealer: 10}
            const playersName = 'player'
            const playersNameCopy = 'player'
            const playersScores = [5, 15]
            const playersScoresCopy = [5, 15]
    
            nextPlay('stand', undefined, undefined, resultsLookup, playersName, playersScores)
    
            expect(resultsLookup).toEqual(resultsLookupCopy)
            expect(playersName).toEqual(playersNameCopy)
            expect(playersScores).toEqual(playersScoresCopy)
        })
    })
})