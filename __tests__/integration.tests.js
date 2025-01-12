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

    // dealCard to have been called with (dealer, deck, etc.)
    // dealCard to have been called with (player, deck, etc.)
    // dealCard to have been called with (dealer, deck, etc.)q
    // getScores from hand dealer 
    // updateResults (dealer)
    // getScores(player)

describe("InitialiseGame Integration", () => {    

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
    test("For a 1 player game, dealCard is called 1 time for the player", () => {
        initialiseGame();
        
        const firstCallArguments = mockDealCard.mock.calls[0];        
        
        expect(firstCallArguments).toEqual([testDeck, []])
    });
    test("For a 1 player game, the second card is dealt to the dealer", () => {        
        const { dealerHand, deck} = initialiseGame();
        
        const expectedSecondCardDealt = { "emblem": "clubs", "name": "Two", "values": [2] }

        expect(dealerHand).toContainEqual(expectedSecondCardDealt)
        expect(deck).not.toContainEqual(expectedSecondCardDealt)
    });
});
