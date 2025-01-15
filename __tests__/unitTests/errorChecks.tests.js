const errorCheckArray = require("../../utils/errorChecks/errorCheckArray");
const errorCheckHand = require("../../utils/errorChecks/errorCheckHand");
const errorCheckScores = require("../../utils/errorChecks/errorCheckScores");
const errorCheckObject = require("../../utils/errorChecks/errorCheckObject");
const errorCheckString = require("../../utils/errorChecks/errorCheckString");
const errorCheckDecision = require("../../utils/errorChecks/errorCheckDecision");

describe("errorCheckArray", () => {
    test("Does not mutate the input array", () => {        
        const inputArray = [1, 2, 3]
        const inputCopy = [1, 2, 3]

        errorCheckArray(inputArray)
        expect(inputArray).toEqual(inputCopy);
    });

    test("Throws an error if missing an input", () => {        
        function errorCheckNoInputArray () {
            errorCheckArray()
        }
        expect(errorCheckNoInputArray).toThrow("'input' must be provided");
    });

    test("Throws an error if 'input' is not an array", () => {        
        function errorCheckNotTypeArray () {
            errorCheckArray('shouldBeArray')
        }
        expect(errorCheckNotTypeArray).toThrow("'input' should be an array");
    });

    test("Throws an error if 'input' is an empty array", () => {        
        function errorCheckEmptyArray () {
            errorCheckArray([])
        }
        expect(errorCheckEmptyArray).toThrow("'input' should not be empty");
    });

    test("Throws an error containing the variable arrayName", () => {        
        function errorCheckNoInputArray () {
            errorCheckArray(undefined, 'deck')
        }
        expect(errorCheckNoInputArray).toThrow("'deck' must be provided");

        function errorCheckNotTypeArray () {
            errorCheckArray('shouldBeArray', 'hand')
        }
        expect(errorCheckNotTypeArray).toThrow("'hand' should be an array");

        function errorCheckEmptyArray () {
            errorCheckArray([], 'scores')
        }
        expect(errorCheckEmptyArray).toThrow("'scores' should not be empty");
    });
})

describe("\n errorCheckHand", () => {
    describe("Error checks the input hand", () => {
        test("Throws an error if missing an input", () => {        
            function errorCheckNoInputHand () {
                errorCheckHand()
            }
            expect(errorCheckNoInputHand).toThrow("'hand' must be provided");
        });

        test("Throws an error if 'hand' is not an array", () => {        
            function errorCheckWrongTypeHand () {
                errorCheckHand('shouldBeArray')
            }
            expect(errorCheckWrongTypeHand).toThrow("'hand' should be an array");
        });

        test("Throws an error if 'hand' is an empty array", () => {        
            function errorCheckEmptyHand () {
                errorCheckHand([])
            }
            expect(errorCheckEmptyHand).toThrow("'hand' should not be empty");
        });        
    })

    describe("Error checks each card of hand", () => {
        test("Throws an error if cards are empty", () => {
            function errorCheckEmptyCards() {
                errorCheckHand([{}]);
            }
            expect(errorCheckEmptyCards).toThrow("'hand' should contain valid card objects");
        });

        test("Throws an error if cards do not contain 'emblem'", () => {
            function errorCheckNoEmblemCard() {
                errorCheckHand([{ invalidEmblem: "clubs", name: "Two", values: [2] }]);
            }
            expect(errorCheckNoEmblemCard).toThrow("'hand' should contain valid card objects");
        });

        test("Throws an error if cards do not contain 'name'", () => {
            function errorCheckNoNameCard() {
                errorCheckHand([{ emblem: "clubs", invalidName: "Two", values: [2] }]);
            }
            expect(errorCheckNoNameCard).toThrow("'hand' should contain valid card objects");
        });

        test("Throws an error if cards do not contain 'values'", () => {
            function errorCheckNoValues() {
                errorCheckHand([{ emblem: "clubs", name: "Two", invalidValues: [2] }]);
            }
            expect(errorCheckNoValues).toThrow("'hand' should contain valid card objects");
        });
    });
})

describe("\n errorCheckScores", () => {
    test("Throws an error if missing an input", () => {        
        function errorCheckNoInputScore () {
            errorCheckScores()
        }
        expect(errorCheckNoInputScore).toThrow("'scores' must be provided");
    });

    test("Throws an error if scores are not numbers", () => {
        function errorCheckWrongTypeScores() {
            errorCheckScores([5, 'should be a number'])
        }
        expect(errorCheckWrongTypeScores).toThrow("'scores' should be numbers");
    });

    test("Throws an error if scores is less than 2 (two aces)", () => {
        function errorCheckInvalidScores() {
            errorCheckScores([2, -1])
        }
        expect(errorCheckInvalidScores).toThrow("'scores' should be at least 2");
    });
})

describe("\n errorCheckObject", () => {
    test("Does not mutate the input array", () => {        
        const inputObject = {dealer: 10}
        const inputCopy = {dealer: 10}

        errorCheckObject(inputObject)

        expect(inputObject).toEqual(inputCopy);
    });

    test("Throws an error if missing an input", () => {        
        function errorCheckMissingInput () {
            errorCheckObject()
        }
        expect(errorCheckMissingInput).toThrow("'input' must be provided");
    });

    test("Throws an error if 'input' is not an object", () => {        
        function errorCheckWrongInputType () {
            errorCheckObject('shouldBeObject')
        }
        expect(errorCheckWrongInputType).toThrow("'input' should be an object");
    });

    test("Throws an error containing the variable objectName", () => {        
        function errorCheckMissingInput () {
            errorCheckObject(undefined, 'results')
        }
        expect(errorCheckMissingInput).toThrow("'results' must be provided");
    });
})


describe("\n errorCheckString", () => {
    test("Does not reassign the value of the input string", () => {        
        const inputString = 'player'
        const inputCopy = 'player'

        errorCheckString(inputString)

        expect(inputString).toEqual(inputCopy);
    });

    test("Throws an error if missing an input", () => {        
        function errorCheckNoInputName () {
            errorCheckString()
        }
        expect(errorCheckNoInputName).toThrow("'input' must be provided");
    });

    test("Throws an error if 'input' is not an string", () => {        
        function errorCheckWrongTypeName () {
            errorCheckString(1)
        }
        expect(errorCheckWrongTypeName).toThrow("'input' should be a string");
    });
    
    test("Throws an error if 'input' is an empty string", () => {        
        function errorCheckEmptyName () {
            errorCheckString('')
        }
        expect(errorCheckEmptyName).toThrow("'input' should have length > 0");
    });
})


describe("\n errorCheckDecision", () => {
    test("Does not reassign the value of the input string", () => {        
        const inputString = 'hit'
        const inputCopy = 'hit'

        errorCheckDecision(inputString)

        expect(inputString).toEqual(inputCopy);
    });
    
    test("Throws an error if 'decision' is neither 'hit' nor 'stand'", () => {        
        function errorCheckInvalidDecision () {
            errorCheckDecision('something')
        }
        expect(errorCheckInvalidDecision).toThrow("'decision' should be either 'hit' or 'stand'");
    });

    test("Throws no error if 'decision' is 'hit' nor 'stand'", () => {        
        function errorCheckHitDecision () {
            errorCheckDecision('hit')
        }
        expect(errorCheckHitDecision).not.toThrow();

        function errorCheckStandDecision () {
            errorCheckDecision('stand')
        }
        expect(errorCheckStandDecision).not.toThrow();
    });
})

