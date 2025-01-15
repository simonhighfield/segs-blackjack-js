const errorCheckDecision = require("../errorChecks/errorCheckDecision")
const errorCheckString = require("../errorChecks/errorCheckString")
const dealCard = require("./dealCard")
const updateResultsLookup = require("./updateResultsLookup")

module.exports = nextPlay = (decision, deck, hand, results, playersName, scores) => {
    try {
        // errorCheckString(decision, 'decision')
        // errorCheckDecision(decision)

        if (decision === 'hit') {
    
            return dealCard(deck, hand)
        } 
        else if  (decision === 'stand') {
            
            return updateResultsLookup(results, playersName, scores)
        }
    }
    catch (error) {
        // console.error("error in nextPlay: ", error.message);
        throw error
    }
}