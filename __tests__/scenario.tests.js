const { expectedEmblems, expectedNames, expectedDeck, expectedValues } = require("../data/testData");
const initialiseGame = require("../utils/gameInitialisation/initialiseGame");
const getHandValidityFromScores = require("../utils/gamePlay/getHandValidityFromScores");
const getPossibleScoresFromHand = require("../utils/gamePlay/getPossibleScoresFromHand");
const nextPlay = require("../utils/gamePlay/nextPlay");

describe("Scenario Tests for BBC SEGS application", () => {


    describe("When dealt my opening hand, I have two cards", () => {
        const { playersHand } = initialiseGame()

        test("Hand is an array of size 2", () => {
            expect(playersHand).toBeArrayOfSize(2)
        });
        test("Hand contains valid card objects", () => {
            playersHand.forEach(card => {

                expect(card).toMatchObject({
                    emblem: expect.toBeOneOf(expectedEmblems),
                    name: expect.toBeOneOf(expectedNames),
                    values: expect.toBeOneOf(expectedValues)
                })

                expect(expectedDeck).toContainEqual(card)
            });
        })
    });


    describe("When I choose to 'hit' I receive another card and my score is updated", () => {
        const resultsLookup = {
            dealer: 10
        }
        const initialDeck = [
            { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            { "emblem": "diamonds", "name": "Two", "values": [2] },
        ]
        const initialplayersHand = [
            { "emblem": "clubs", "name": "Queen", "values": [10] },
            { "emblem": "clubs", "name": "King", "values": [10] }
        ]
        const playersInitialScores = getPossibleScoresFromHand(initialplayersHand) 

        const { newDeck, newHand } = nextPlay('hit', initialDeck, initialplayersHand, resultsLookup, 'player', playersInitialScores)
        
        test("The next card from deck is added to hand ", () => {
            const expectedNewDeck = [
                { "emblem": "diamonds", "name": "Two", "values": [2] }
            ]
            const expectedNewHand = [
                { "emblem": "clubs", "name": "Queen", "values": [10] },
                { "emblem": "clubs", "name": "King", "values": [10] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            ]
            
            expect(newDeck).toEqual(expectedNewDeck)
            expect(newHand).toEqual(expectedNewHand)
        })
        test("The player's score is updated", () => {
            const playersNewScores = getPossibleScoresFromHand(newHand) 
            
            const expectedNewScores = [21]
            
            expect(playersNewScores).not.toEqual(playersInitialScores)
            expect(playersNewScores).toEqual(expectedNewScores)
        })
    });


    describe("When I choose to 'stand', I receive no further cards, and my score is evaluated", () => {
        const initialResultsLookup = {
            dealer: 10
        }
        const initialDeck = [
            { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            { "emblem": "diamonds", "name": "Two", "values": [2] },
        ]
        const initialplayersHand = [
            { "emblem": "clubs", "name": "Queen", "values": [10] },
            { "emblem": "clubs", "name": "King", "values": [10] }
        ]
        const playersInitialScores = getPossibleScoresFromHand(initialplayersHand) 

        test("No Cards are moved from the deck to the hand", () => {          
            const expectedDeck = [
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
                { "emblem": "diamonds", "name": "Two", "values": [2] },
            ]
            const expectedplayersHand = [
                { "emblem": "clubs", "name": "Queen", "values": [10] },
                { "emblem": "clubs", "name": "King", "values": [10] }
            ]
            const expectedplayersScores = [20]
            
            expect(initialDeck).toEqual(expectedDeck)
            expect(initialplayersHand).toEqual(expectedplayersHand)
            expect(playersInitialScores).toEqual(expectedplayersScores)
        })

        nextPlay('stand', initialDeck, initialplayersHand, initialResultsLookup, 'player', playersInitialScores)

        test("resultsLookup object is updated", () => {
            const expectedResultsLookup = {
                dealer: 10,
                player: 20
            }

            const updatedResultsLookup = nextPlay('stand', initialDeck, initialplayersHand, initialResultsLookup, 'player', playersInitialScores)


            expect(updatedResultsLookup).not.toEqual(initialResultsLookup)
            expect(updatedResultsLookup).toEqual(expectedResultsLookup)
        })
    });


    describe("When score is 21 or less, the hand is valid", () => {
        test("if one possible score is < 21, isHandValid evaluates to true", () => {
            const scores = [10]
            
            const isHandValid = getHandValidityFromScores(scores)

            expect(isHandValid).toBeTrue();
        });
        test("if two possible scores are < 21, isHandValid evaluates to true", () => {
            const scores = [10, 20]
            
            const isHandValid = getHandValidityFromScores(scores)

            expect(isHandValid).toBeTrue();
        });
        test("if one of two possible scores is === 21, isHandValid evaluates to true", () => {
            const scores = [11, 21]
            
            const isHandValid = getHandValidityFromScores(scores)

            expect(isHandValid).toBeTrue();
        });
        test("if one of two possible scores is =< 21, and the other is > 21, isHandValid evaluates to true", () => {
            const scores = [21, 31]
            
            const isHandValid = getHandValidityFromScores(scores)

            expect(isHandValid).toBeTrue();
        });
    });


    describe("When score is 22 or more, the hand is invalid", () => {
        test("if one possible score is === 22, isHandValid evaluates to false", () => {
            const scores = [22]
            
            const isHandValid = getHandValidityFromScores(scores)

            expect(isHandValid).toBeFalse();
        });
        test("if one possible score is > 22, isHandValid evaluates to false", () => {
            const scores = [23]
            
            const isHandValid = getHandValidityFromScores(scores)

            expect(isHandValid).toBeFalse();
        });
        test("if two possible scores are > 22, isHandValid evaluates to false", () => {
            const scores = [23, 33]
            
            const isHandValid = getHandValidityFromScores(scores)

            expect(isHandValid).toBeFalse();
        });
    });



    describe("Given a king and an ace", () => {
        test("best score correctly evaluates to 21", () => {
            const hand = [
                { "emblem": "clubs", "name": "King", "values": [10] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] }
            ]
            const expectedBestScore = 21
            
            const scores = getPossibleScoresFromHand(hand)
            const bestScore = getBestScore(scores)
    
            expect(bestScore).toBe(expectedBestScore)
   
        });
    });


    describe("Given a king, a queen, and an ace", () => {
        test("best score correctly evaluates to 21", () => {
            const hand = [
                { "emblem": "clubs", "name": "King", "values": [10] },
                { "emblem": "clubs", "name": "Queen", "values": [10] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] }
            ]
            const expectedBestScore = 21
            
            const scores = getPossibleScoresFromHand(hand)
            const bestScore = getBestScore(scores)
    
            expect(bestScore).toBe(expectedBestScore)
        });
    });


    describe("Given a nine, and two aces", () => {
        test("best score correctly evaluates to 21", () => {
            const hand = [
                { "emblem": "clubs", "name": "Nine", "values": [9] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
                { "emblem": "hearts", "name": "Ace", "values": [1, 11] }
            ]
            const expectedBestScore = 21
            
            const scores = getPossibleScoresFromHand(hand)
            const bestScore = getBestScore(scores)
            
            expect(bestScore).toBe(expectedBestScore)
        });
    });
});