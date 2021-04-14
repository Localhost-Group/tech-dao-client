import ContractsHandler from './ContractsHandler'

class TDCHandler {
    static gatherCoinsForLearning = async (mentorAddress, studentAddress) => {
        const contract = ContractsHandler.getCoinContract()
        if (!contract) {
            throw new Error('contract isnt initialized')
        }
        try {
            console.log(contract)
            const done = await contract.methods.earnForLearning(mentorAddress, studentAddress)
                .send({
                    from: mentorAddress
                }).once('transactionHash', (txHash) => {
                    console.log('done', txHash)
                })
                .catch((err) => {
                    console.log('done err', err)
                });
            return done
        } catch (err) {
            console.error('giveCoinsToMentor address', err)
        }
    };

}

export default TDCHandler
