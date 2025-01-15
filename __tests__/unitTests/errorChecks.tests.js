const errorCheckArray = require("../../utils/errorChecks/errorCheckArray");
const errorCheckCardArray = require("../../utils/errorChecks/errorCheckCardArray");
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

    test("Throws an error containing the variable arrayName", () => {        
        function errorCheckNoInputArray () {
            errorCheckArray(undefined, 'deck')
        }
        expect(errorCheckNoInputArray).toThrow("'deck' must be provided");

        function errorCheckNotTypeArray () {
            errorCheckArray('shouldBeArray', 'hand')
        }
        expect(errorCheckNotTypeArray).toThrow("'hand' should be an array");
    });
})

describe("\n errorCheckCardArray", () => {
    describe("Error checks the input hand", () => {
        test("Throws an error if missing an input", () => {        
            function errorCheckNoInputHand () {
                errorCheckCardArray()
            }
            expect(errorCheckNoInputHand).toThrow("'cardArray' must be provided");
        });

        test("Throws an error if 'hand' is not an array", () => {        
            function errorCheckWrongTypeHand () {
                errorCheckCardArray('shouldBeArray')
            }
            expect(errorCheckWrongTypeHand).toThrow("'cardArray' should be an array");
        });

        test.skip("Throws an error if 'hand' is an empty array", () => {        
            function errorCheckEmptyHand () {
                errorCheckCardArray([])
            }
            expect(errorCheckEmptyHand).toThrow("'cardArray' should not be empty");
        });        
    })

    describe("Error checks each card of hand", () => {
        test("Throws an error if cards are empty", () => {
            function errorCheckEmptyCards() {
                errorCheckCardArray([{}]);
            }
            expect(errorCheckEmptyCards).toThrow("'cardArray' should contain valid card objects");
        });

        test("Throws an error if cards do not contain 'emblem'", () => {
            function errorCheckNoEmblemCard() {
                errorCheckCardArray([{ invalidEmblem: "clubs", name: "Two", values: [2] }]);
            }
            expect(errorCheckNoEmblemCard).toThrow("'cardArray' should contain valid card objects");
        });

        test("Throws an error if cards do not contain 'name'", () => {
            function errorCheckNoNameCard() {
                errorCheckCardArray([{ emblem: "clubs", invalidName: "Two", values: [2] }]);
            }
            expect(errorCheckNoNameCard).toThrow("'cardArray' should contain valid card objects");
        });

        test("Throws an error if cards do not contain 'values'", () => {
            function errorCheckNoValues() {
                errorCheckCardArray([{ emblem: "clubs", name: "Two", invalidValues: [2] }]);
            }
            expect(errorCheckNoValues).toThrow("'cardArray' should contain valid card objects");
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

