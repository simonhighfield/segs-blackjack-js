module.exports = errorCheckArray = (array, arrayName) => {
    if (array === undefined) {
        throw new TypeError(`'${arrayName}' must be provided`);
    } else if (!Array.isArray(array)) {
        throw new TypeError(`'${arrayName}' should be an array`);
    } else if (array.length === 0) {
        throw new TypeError(`'${arrayName}' should not be empty`);
    }
}