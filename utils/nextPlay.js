const dealCard = require("./dealCard")
const updateResultsLookup = require("./updateResultsLookup")

module.exports = nextPlay = (input, deck, hand, results, playerName, scores) => {

    if (input === 'hit') {

        return dealCard(deck, hand)
    } 
    else if  (input === 'stand') {
        
        return updateResultsLookup(results, playerName, scores)
    }
}