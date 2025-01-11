
jest.mock("../utils/generateSuit", () => jest.fn());
const generateDeck = require("../utils/generateDeck");
const mockGenerateSuit = require("../utils/generateSuit");

jest.mock("../utils/dealCard", () => jest.fn());
const nextPlay = require("../utils/nextPlay");
const mockDealCard = require("../utils/dealCard");

describe("GenerateDeck Integration", () => {
    beforeAll(() => {
        mockGenerateSuit.mockReturnValue([]);
    });
    
    test("generateSuit has been called for each emblem", () => {
        generateDeck();
        
        expect(mockGenerateSuit).toHaveBeenCalledTimes(4);
        
        expect(mockGenerateSuit).toHaveBeenCalledWith("clubs");
        expect(mockGenerateSuit).toHaveBeenCalledWith("diamonds");
        expect(mockGenerateSuit).toHaveBeenCalledWith("hearts");
        expect(mockGenerateSuit).toHaveBeenCalledWith("spades");
    });
});


describe("nextPlay Integration", () => {
    const { expectedDeck } = require("../data/testData");
    const hand = [
        { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
        { "emblem": "diamonds", "name": "Ace", "values": [1, 11] },
    ]
    beforeAll(() => {
    });

    test("If input === hit, then dealCard is invoked with the input deck and hand", () => {
        nextPlay('hit', expectedDeck, hand)

        expect(mockDealCard).toHaveBeenCalledTimes(1)
        expect(mockDealCard).toHaveBeenCalledWith(expectedDeck, hand);
    });
});