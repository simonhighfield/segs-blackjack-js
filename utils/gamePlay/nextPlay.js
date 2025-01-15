const errorCheckDecision = require("../errorChecks/errorCheckDecision")
const dealCard = require("./dealCard")
const updateResultsLookup = require("./updateResultsLookup")

module.exports = nextPlay = (decision, deck, hand, results, playersName, scores) => {
    errorCheckDecision(decision)

    if (decision === 'hit') {

        return dealCard(deck, hand)
    } 
    else if  (decision === 'stand') {
        
        return updateResultsLookup(results, playersName, scores)
    }
}