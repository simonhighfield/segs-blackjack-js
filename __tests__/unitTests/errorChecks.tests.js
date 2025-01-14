const errorCheckArray = require("../../utils/errorChecks/errorCheckArray");
const errorCheckHand = require("../../utils/errorChecks/errorCheckHand");
const errorCheckScores = require("../../utils/errorChecks/errorCheckScores");
const errorCheckObject = require("../../utils/errorChecks/errorCheckObject");
const errorCheckPlayerName = require("../../utils/errorChecks/errorCheckPlayerName");

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

describe("errorCheckHand", () => {
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

describe("errorCheckScores", () => {
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

    test("Throws an error if all scores are > 21", () => {
        function errorCheckInvalidScores() {
            errorCheckScores([22, 32])
        }
        expect(errorCheckInvalidScores).toThrow("'scores' should contain at least one score < 21");
    });
})

describe("errorCheckObject", () => {
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


describe("errorCheckPlayerName", () => {
    test("Does not reassign the value of the input string", () => {        
        const inputString = 'player'
        const inputCopy = 'player'

        errorCheckPlayerName(inputString)

        expect(inputString).toEqual(inputCopy);
    });

    test("Throws an error if missing an input", () => {        
        function errorCheckNoInputName () {
            errorCheckPlayerName()
        }
        expect(errorCheckNoInputName).toThrow("'playerName' must be provided");
    });

    test("Throws an error if 'playerName' is not an string", () => {        
        function errorCheckWrongTypeName () {
            errorCheckPlayerName(1)
        }
        expect(errorCheckWrongTypeName).toThrow("'playerName' should be a string");
    });
    
    test("Throws an error if 'playerName' is an empty string", () => {        
        function errorCheckEmptyName () {
            errorCheckPlayerName('')
        }
        expect(errorCheckEmptyName).toThrow("'playerName' should have length > 0");
    });
})

