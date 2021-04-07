
class OnChainDataHandler {
    static getDataFromContract = async (contract, userAddress) => {
        if (!contract) {
            throw new Error('Event contract not initiated')
        }
        try {
            const decimals = await contract.methods.decimals().call()
            const symbol = await contract.methods.symbol().call()
            const totalSupply = await contract.methods.totalSupply().call();
            const balance = await contract.methods.balanceOf(userAddress).call()

            return {
                decimals, symbol, totalSupply, balance
            }
        } catch (err) {
            console.log('err', err)
            return false
        }
    };
}

export default OnChainDataHandler;
