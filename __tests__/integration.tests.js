jest.mock("../utils/generateSuit", () => jest.fn());
const generateDeck = require("../utils/generateDeck");
const mockGenerateSuit = require("../utils/generateSuit");

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
