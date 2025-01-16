jest.mock("../utils/gameInitialisation/generateSuit", () => jest.fn());
const mockGenerateSuit = require("../utils/gameInitialisation/generateSuit");

jest.mock("../utils/gameInitialisation/generateDeck", () => jest.fn());
const originalGenerateDeck = jest.requireActual("../utils/gameInitialisation/generateDeck");
const mockGenerateDeck = require("../utils/gameInitialisation/generateDeck");

jest.mock("../utils/gamePlay/dealCard", () => jest.fn());
jest.mock("../utils/gamePlay/updateResultsLookup", () => jest.fn());
const nextPlay = require("../utils/gamePlay/nextPlay");
const mockDealCard = require("../utils/gamePlay/dealCard");
const mockUpdateResults = require("../utils/gamePlay/updateResultsLookup");

const initialiseGame = require("../utils/gameInitialisation/initialiseGame");


describe("generateDeck Integration", () => {
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



describe("\n initialiseGame Integration (1 player game)", () => {    
    const testDeck = [
        { "emblem": "clubs", "name": "Ace", "values": [1, 11] },
        { "emblem": "clubs", "name": "Two", "values": [2] },
        { "emblem": "clubs", "name": "Three", "values": [3] },
        { "emblem": "clubs", "name": "Four", "values": [4] },
        { "emblem": "clubs", "name": "Five", "values": [5] },
        { "emblem": "clubs", "name": "Six", "values": [6] }
    ]
    beforeEach(() => {
        mockGenerateDeck.mockReset();
        mockDealCard.mockReset()

        mockGenerateDeck.mockReturnValue(testDeck); 

        mockDealCard.mockImplementation((deck, hand) => {
            const card = deck[0];
            return {
                newDeck: deck.slice(1),
                newHand: [...hand, card],
            };
        });
    });

    test("generateDeck is called during initialiseGame", () => {   
        initialiseGame();

        expect(mockGenerateDeck).toHaveBeenCalledTimes(1);
    });
    test("dealCard is called 1st with an empty array (dealing player's first card)", () => {
        const expectedFirstDealArguments = []

        initialiseGame();
        const actualFirstDealArguments = mockDealCard.mock.calls[0];        
        
        expect(actualFirstDealArguments).toEqual([testDeck, expectedFirstDealArguments])
    });
});