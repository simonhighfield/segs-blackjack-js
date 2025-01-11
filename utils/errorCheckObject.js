
module.exports = errorCheckObject = (object, objectName = 'input') => {
    if (object === undefined) {
        throw new TypeError(`'${objectName}' must be provided`);
    } else if (typeof object !== 'object') {
        throw new TypeError(`'${objectName}' should be an object`);
    } 
}
