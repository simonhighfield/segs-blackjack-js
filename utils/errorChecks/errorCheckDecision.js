const errorCheckString = require("./errorCheckString");

module.exports = errorCheckDecision = (decision) => {
    errorCheckString(decision, 'decision')

    if (decision !== 'hit' && decision !== 'stand') {
        throw new TypeError("'decision' should be either 'hit' or 'stand'");
    }
}