// gatherExpForLearning (mentor, student, amount)
// gatherExpForPublishing (mentor, amount)

import ContractsHandler from './ContractsHandler'

const contractPayableMethod = (contract, methodName, args = [], send = {}) => {
    return new Promise((resolve, reject) => {
        contract.methods[methodName](...args)
            .send(send).once('transactionHash', (txHash) => {
                resolve({
                    success: true,
                    txHash,
                })
            })
            .catch((err) => {
                reject({
                    success: false,
                    args, send,
                    message: err.message
                })
            });
    })
}

class EXPHandler {
    static gatherExpForLearning = async (expAddress, mentorAddress, studentAddress, amount) => {
        const contract = ContractsHandler.getExpContract(expAddress)
        if (!contract) {
            throw new Error('contract isnt initialized')
        }
        try {
            const done = await contractPayableMethod(contract,
                'gatherExpForLearning',
                [mentorAddress, studentAddress, amount], {
                from: mentorAddress
            })
            return done
        } catch (err) {
            console.error('gatherExpForLearning err', err)
        }
    };

    static gatherExpForPublishing = async (expAddress, mentorAddress, amount) => {
        const contract = ContractsHandler.getExpContract(expAddress)
        if (!contract) {
            throw new Error('contract isnt initialized')
        }
        try {
            const done = await contractPayableMethod(contract,
                'gatherExpForPublishing',
                [mentorAddress,  amount], {
                from: mentorAddress
            })
            return done
        } catch (err) {
            console.error('gatherExpForPublishing err', err)
        }
    };

}

export default EXPHandler
