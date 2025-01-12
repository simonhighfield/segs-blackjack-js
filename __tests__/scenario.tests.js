const { expectedEmblems, expectedNames, expectedDeck, expectedValues } = require("../data/testData");
const errorCheckScores = require("../utils/errorCheckScores");
const initialiseGame = require("../utils/initialiseGame");

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
});