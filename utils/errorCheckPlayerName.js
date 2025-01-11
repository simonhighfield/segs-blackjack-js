module.exports = errorCheckPlayerName = (playerName) => {
    if (playerName === undefined) {
        throw new TypeError(`'playerName' must be provided`);
    } else if (typeof playerName !== 'string') {
        throw new TypeError(`'playerName' should be a string`);
    } else if (playerName.length === 0) {
        throw new TypeError(`'playerName' should have length > 0`);
    }
}
