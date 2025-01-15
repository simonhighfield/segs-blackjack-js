module.exports = errorCheckString = (input, stringName = 'input') => {
    if (input === undefined) {
        throw new TypeError(`'${stringName}' must be provided`);
    } else if (typeof input !== 'string') {
        throw new TypeError(`'${stringName}' should be a string`);
    } else if (input.length === 0) {
        throw new TypeError(`'${stringName}' should have length > 0`);
    }
}