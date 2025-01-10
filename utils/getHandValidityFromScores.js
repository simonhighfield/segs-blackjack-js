const errorCheckArray = require("./errorCheckArray")

module.exports = getHandValidityFromScores = (inputScores) => {

    inputScores.forEach(score => {
        console.log(score, typeof score, typeof score !== 'number');
        if (typeof score !== 'number') {
            
            throw new TypeError("'scores' should be valid numbers");
        }
    });
}