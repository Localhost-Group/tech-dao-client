import coinAbi from './abi/TCOIN.json'
import expAbi from './abi/TEXP.json'
import addresses from './contracts.json'

function preprocess() {
    const abi = {
        coin: coinAbi,
        exps: expAbi,
    }
    const connected = { addresses, abi }

    return connected
}

export default preprocess()