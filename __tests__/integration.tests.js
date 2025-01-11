jest.mock("../utils/generateSuit", () => jest.fn());
const mockGenerateSuit = require("../utils/generateSuit");

jest.mock("../utils/generateDeck", () => jest.fn());
const originalGenerateDeck = jest.requireActual("../utils/generateDeck");
const mockGenerateDeck = require("../utils/generateDeck");

jest.mock("../utils/dealCard", () => jest.fn());
jest.mock("../utils/updateResults", () => jest.fn());
const nextPlay = require("../utils/nextPlay");
const mockDealCard = require("../utils/dealCard");
const mockUpdateResults = require("../utils/updateResults");

const initialiseGame = require("../utils/initialiseGame");

describe("GenerateDeck Integration", () => {
    test("generateSuit has been called for each emblem", () => {
        mockGenerateSuit.mockReturnValue([]);   
        mockGenerateDeck.mockImplementation(() => originalGenerateDeck());

        generateDeck();

        expect(mockGenerateSuit).toHaveBeenCalledTimes(4);
        expect(mockGenerateSuit).toHaveBeenCalledWith("clubs");
        expect(mockGenerateSuit).toHaveBeenCalledWith("diamonds");
        expect(mockGenerateSuit).toHaveBeenCalledWith("hearts");
        expect(mockGenerateSuit).toHaveBeenCalledWith("spades");

        mockGenerateDeck.mockReset();
        mockGenerateSuit.mockReset();
    });
});

describe("InitialiseGame Integration", () => {    
    test("generateDeck is called during initialiseGame", () => {
        mockGenerateDeck.mockClear();

        initialiseGame();

        expect(mockGenerateDeck).toHaveBeenCalledTimes(1);
    });
});
