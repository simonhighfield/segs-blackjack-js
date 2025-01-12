const dealCard = require("./dealCard")
const updateResults = require("./updateResultsLookup")

module.exports = nextPlay = (input, deck, hand, results, playerName, scores) => {

    if (input === 'hit') {

        return dealCard(deck, hand)
    } 
    else if  (input === 'stand') {
        
        updateResults(results, playerName, scores)
    }
}