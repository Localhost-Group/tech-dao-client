import Web3Controller from './Web3Controller'
import contracts from '../contracts'

// const testContract = null

class ContractsHandler {
  coin = null
  exps = {}

  _initContract = async (abi, address) => {
    try {
      const contract = await Web3Controller.initContracts(
        abi,
        address,
      );

      return contract
    } catch (err) {
      console.error('_initContract address', err)
    }
  };

  _initCoin = async () => {
    const { abi, addresses } = contracts

    try {
      const coin = await this._initContract(abi['coin'], addresses['coin']['TDC'])
      this.coin = coin
    }
    catch (err) {
      alert(`coin contract problem: ${err.message}`)
    }

    return true
  }

  _initExps = async () => {
    const { abi, addresses } = contracts

    try {
      const expTokens = Object.keys(addresses['exps'])
      const exps = await Promise.all(expTokens.map((key) => this._initContract(abi['exps'], addresses['exps'][key])))
      
      const fullfilled = expTokens.reduce((c, key) => {
        const address = addresses['exps'][key]
        const [found] = exps.filter(c_ => c_._address === address)
        c[address] = found
        return c
      }, {})
      this.exps = fullfilled
    }
    catch (err) {
      alert(`exp contract problem: ${err.message}`)
    }

    return true
  }

  init = async () => {
    await this._initCoin()
    await this._initExps()

    return true
  }


  getCoinContract = () => this.coin

  getExpContract = address => this.exps[address]

}

const contractsHandler = new ContractsHandler()
export default contractsHandler
