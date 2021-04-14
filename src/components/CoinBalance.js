import { useCallback } from 'react'
import { ContractsHandler, Web3Controller, TDCHandler } from '../controllers'

const studentAddress = '0xCBfFDc8767330aaC8a9F44094c3127Aa0Ec5Dba0'

function CoinBalance({ coin, userAddress }) {
    const addToMetamask = useCallback(() => {
        if (!coin.address) {
            return null
        }

        async function add() {
            try {
                const contract = ContractsHandler.getCoinContract()
                await Web3Controller.addTokenToWallet(contract, coin)
            } catch (err) {
                alert(err.message)
            }
        }

        add()

    }, [coin.address])

    const earnForLearning = useCallback(() => {
        if (!coin.address) {
            return null
        }
        if (!userAddress) {
            return null
        }
        
        async function _earnForLearning() {
            try {
                const success = await TDCHandler.gatherCoinsForLearning(userAddress, studentAddress)
                return success
            } catch (err) {
                alert(err.message)
            }
        }

        _earnForLearning()

    }, [coin.address, userAddress])

    if (!coin.address) {
        return <small>loading...</small>
    }
    return (
        <div className="coin">
            <h2>TechDAO Coin address: {coin.address}</h2>
            <h4>Yours {coin.symbol}: {coin.balance}</h4>
            <h4>minted / totalSupply / burned / maxSupply: {coin.minted} / {coin.totalSupply} / {coin.burned} / {coin.maxSupply}</h4>
            <button type="button" onClick={addToMetamask}>Add {coin.symbol} to Metamask</button>
            <button type="button" onClick={earnForLearning}>Earn for learning</button>
        </div>
    );
}

export default CoinBalance;
