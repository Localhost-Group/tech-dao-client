import { ContractsHandler, Web3Controller, EXPHandler } from '../controllers'
import { useCallback } from 'react'


const studentAddress = '0xCBfFDc8767330aaC8a9F44094c3127Aa0Ec5Dba0'

function SingleExpBalance({ address, balance, symbol, totalSupply, decimals, userAddress }) {
    const addToMetamask = useCallback(() => {
        if (!address) {
            return null
        }

        async function add() {
            try {
                const contract = ContractsHandler.getExpContract(address)
                await Web3Controller.addTokenToWallet(contract, { address, balance, symbol, totalSupply, decimals })
            } catch (err) {
                alert(err.message)
            }
        }

        add()

    }, [address, balance, symbol, totalSupply, decimals])

    const earnForHelp = useCallback(() => {
        if (!address) {
            return null
        }
        if (!userAddress) {
            return null
        }

        async function _earnForHelp() {
            try {
                const success = await EXPHandler.gatherExpForLearning(address, userAddress, studentAddress, 100)
                return success
            } catch (err) {
                alert(err.message)
            }
        }

        _earnForHelp()

    }, [address, userAddress])

    const earnForPublishing = useCallback(() => {
        if (!address) {
            return null
        }
        if (!userAddress) {
            return null
        }

        async function _earnForHelp() {
            try {
                const success = await EXPHandler.gatherExpForPublishing(address, userAddress, 500)
                return success
            } catch (err) {
                alert(err.message)
            }
        }

        _earnForHelp()

    }, [address, userAddress])

    return (
        <div className="exp">
            <h4>{symbol} address: {address}</h4>
            <h5>Yours {symbol}: {balance}</h5>
            <h5>totalSupply of {symbol}: {totalSupply}</h5>
            <button type="button" onClick={addToMetamask}>Add {symbol} to Metamask</button>
            <button type="button" onClick={earnForHelp}>Add {symbol} to Mentor for help</button>
            <button type="button" onClick={earnForPublishing}>Add {symbol} to Mentor for publishing</button>
        </div>
    );
}

function ExpBalances({ exps, userAddress }) {
    if (exps.length === 0) {
        return <small>loading...</small>
    }
    return exps.map((exp) => <SingleExpBalance key={exp.address} {...exp} userAddress={userAddress} />)
}

export default ExpBalances;