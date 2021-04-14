
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

            if (symbol === 'TDC') {
                const minted = await contract.methods.minted().call()
                const maxSupply = await contract.methods.maxSupply().call()
                const burned = await contract.methods.burned().call()
                return {
                    decimals, symbol, totalSupply, balance, address: contract._address, minted, maxSupply, burned
                }
            }

            return {
                decimals, symbol, totalSupply, balance, address: contract._address
            }
        } catch (err) {
            console.log('err', err)
            return false
        }
    };
}

export default OnChainDataHandler;
