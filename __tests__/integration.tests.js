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
    test("For a 1 player game, the second card is dealt to the dealer and removed from the deck", () => {        
        const { dealerHand, deck} = initialiseGame();
        
        const expectedSecondCardDealt = { "emblem": "clubs", "name": "Two", "values": [2] }

        expect(dealerHand).toContainEqual(expectedSecondCardDealt)
        expect(deck).not.toContainEqual(expectedSecondCardDealt)
    });
    test("For a 1 player game, the third card is dealt to the player and removed from deck", () => {        
        const { playerHand, deck} = initialiseGame();
        
        const expectedThirdCardDealt = { "emblem": "clubs", "name": "Three", "values": [3] }

        expect(playerHand).toContainEqual(expectedThirdCardDealt)
        expect(deck).not.toContainEqual(expectedThirdCardDealt)
    });
    test("For a 1 player game, the fourth card is dealt to the dealer and removed from deck", () => {        
        const { dealerHand, deck} = initialiseGame();
        
        const expectedFourthCardDealt = { "emblem": "clubs", "name": "Four", "values": [4] }

        expect(dealerHand).toContainEqual(expectedFourthCardDealt)
        expect(deck).not.toContainEqual(expectedFourthCardDealt)
    });
    test.skip("Returns the results containg the dealers score from their two cards", () => {        
        const { resultsLookup } = initialiseGame();
        
        const expectedResultsLookup = {'dealer': 6}

        expect(resultsLookup).toEqual(expectedResultsLookup)
    });
});
