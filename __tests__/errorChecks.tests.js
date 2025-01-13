const errorCheckArray = require("../utils/errorChecks/errorCheckArray");
const errorCheckObject = require("../utils/errorChecks/errorCheckObject");
const errorCheckPlayerName = require("../utils/errorChecks/errorCheckPlayerName");

describe("errorCheckArray", () => {
    test("Does not mutate the input array", () => {        
        const inputArray = [1, 2, 3]
        const inputCopy = [1, 2, 3]

        errorCheckArray(inputArray)
        expect(inputArray).toEqual(inputCopy);
    });

    test("Throws an error if missing an input", () => {        
        function errorCheckMissingInput () {
            errorCheckArray()
        }
        expect(errorCheckMissingInput).toThrow("'input' must be provided");
    });

    test("Throws an error if 'input' is not an array", () => {        
        function errorCheckWrongInputType () {
            errorCheckArray('shouldBeArray')
        }
        expect(errorCheckWrongInputType).toThrow("'input' should be an array");
    });

    test("Throws an error if 'input' is an empty array", () => {        
        function errorCheckEmptyArray () {
            errorCheckArray([])
        }
        expect(errorCheckEmptyArray).toThrow("'input' should not be empty");
    });

    test("Throws an error containing the variable arrayName", () => {        
        function errorCheckMissingInput () {
            errorCheckArray(undefined, 'deck')
        }
        expect(errorCheckMissingInput).toThrow("'deck' must be provided");

        function errorCheckWrongInputType () {
            errorCheckArray('shouldBeArray', 'hand')
        }
        expect(errorCheckWrongInputType).toThrow("'hand' should be an array");

        function errorCheckEmptyArray () {
            errorCheckArray([], 'scores')
        }
        expect(errorCheckEmptyArray).toThrow("'scores' should not be empty");
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
        function errorCheckMissingInput () {
            errorCheckPlayerName()
        }
        expect(errorCheckMissingInput).toThrow("'playerName' must be provided");
    });

    test("Throws an error if 'playerName' is not an string", () => {        
        function errorCheckWrongInputType () {
            errorCheckPlayerName(1)
        }
        expect(errorCheckWrongInputType).toThrow("'playerName' should be a string");
    });
    
    test("Throws an error if 'playerName' is an empty string", () => {        
        function errorCheckEmptyPlayerName () {
            errorCheckPlayerName('')
        }
        expect(errorCheckEmptyPlayerName).toThrow("'playerName' should have length > 0");
    });
})