const { expectedEmblems, expectedNames, expectedDeck, expectedValues } = require("../data/testData");
const errorCheckScores = require("../utils/errorCheckScores");
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
        const newPlayerScores = getScoresFromHand(newHand)
        


        test("The next card from deck is added to hand ", () => {
            const expectedNewHand = [
                { "emblem": "clubs", "name": "Queen", "values": [10] },
                { "emblem": "clubs", "name": "King", "values": [10] },
                { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
            ]
            const expectedNewDeck = [
                { "emblem": "diamonds", "name": "Two", "values": [2] },
            ]
            
            expect(newHand).toEqual(expectedNewHand)
            expect(newDeck).toEqual(expectedNewDeck)
        })

        
    });
});