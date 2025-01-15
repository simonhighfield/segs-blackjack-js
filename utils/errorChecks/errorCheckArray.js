module.exports = errorCheckArray = (array, arrayName = 'input') => {
    if (array === undefined) {
        throw new TypeError(`'${arrayName}' must be provided`);
    } 
    else if (!Array.isArray(array)) {
        throw new TypeError(`'${arrayName}' should be an array`);
    } 
}