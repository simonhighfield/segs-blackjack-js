const { expectedEmblems, expectedNames, expectedDeck, expectedValues } = require("../data/testData");
const getHandValidityFromScores = require("../utils/getHandValidityFromScores");
const getScoresFromHand = require("../utils/getScoresFromHand");
const initialiseGame = require("../utils/initialiseGame");
const nextPlay = require("../utils/nextPlay");

describe("Scenario Tests for BBC SEGS application", () => {


    describe("When dealt my opening hand, I have two cards", () => {
        const { playerHand } = initialiseGame()

        test("Hand is an array of size 2", () => {
            expect(playerHand).toBeArrayOfSize(2)
        });
        test("Hand contains valid card objects", () => {
            playerHand.forEach(card => {

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
        const initialPlayerHand = [
            { "emblem": "clubs", "name": "Queen", "values": [10] },
            { "emblem": "clubs", "name": "King", "values": [10] }
        ]
        const initialDeck = [
            { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            { "emblem": "diamonds", "name": "Two", "values": [2] },
        ]
        const initialPlayerScores = getScoresFromHand(initialPlayerHand) 

        const { newHand, newDeck } = nextPlay('hit', initialDeck, initialPlayerHand, resultsLookup, 'player', initialPlayerScores)
        
        test("The next card from deck is added to hand ", () => {
            const expectedNewHand = [
                { "emblem": "clubs", "name": "Queen", "values": [10] },
                { "emblem": "clubs", "name": "King", "values": [10] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            ]
            const expectedNewDeck = [
                { "emblem": "diamonds", "name": "Two", "values": [2] }
            ]
            
            expect(newHand).toEqual(expectedNewHand)
            expect(newDeck).toEqual(expectedNewDeck)
        })
        test("The player's score is updated", () => {
            const newPlayerScores = getScoresFromHand(newHand) 
            
            const expectedNewScores = [21]
            
            expect(newPlayerScores).not.toEqual(initialPlayerScores)
            expect(newPlayerScores).toEqual(expectedNewScores)
        })
    });


    describe("When I choose to 'stand', I receive no further cards, and my score is evaluated", () => {
        const initialResultsLookup = {
            dealer: 10
        }
        const initialPlayerHand = [
            { "emblem": "clubs", "name": "Queen", "values": [10] },
            { "emblem": "clubs", "name": "King", "values": [10] }
        ]
        const initialDeck = [
            { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            { "emblem": "diamonds", "name": "Two", "values": [2] },
        ]
        const initialPlayerScores = getScoresFromHand(initialPlayerHand) 

        test("No Cards are moved from the deck to the hand", () => {
            nextPlay('stand', initialDeck, initialPlayerHand, initialResultsLookup, 'player', initialPlayerScores)

            const expectedPlayerHand = [
                { "emblem": "clubs", "name": "Queen", "values": [10] },
                { "emblem": "clubs", "name": "King", "values": [10] }
            ]
            const expectedDeck = [
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
                { "emblem": "diamonds", "name": "Two", "values": [2] },
            ]
            const expectedPlayerScores = [20]

            expect(initialDeck).toEqual(expectedDeck)
            expect(initialDeck).toEqual(expectedDeck)
            expect(initialPlayerScores).toEqual(expectedPlayerScores)
        })

        test("resultsLookup object is updated", () => {
            const updatedResultsLookup = nextPlay('stand', initialDeck, initialPlayerHand, initialResultsLookup, 'player', initialPlayerScores)

            const expectedResultsLookup = {
                dealer: 10,
                player: 20
            }

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
            const scores = getScoresFromHand(hand)
            const bestScore = getBestScore(scores)
    
            const expectedBestScore = 21
    
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
            const scores = getScoresFromHand(hand)
            const bestScore = getBestScore(scores)
            
            const expectedBestScore = 21
    
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
            const scores = getScoresFromHand(hand)
            const bestScore = getBestScore(scores)
            
            const expectedBestScore = 21
    
            expect(bestScore).toBe(expectedBestScore)
   
        });
    });
});