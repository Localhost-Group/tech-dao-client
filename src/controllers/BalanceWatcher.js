import OnChainDataHandler from './OnChainDataHandler';
import ContractsHandler from './ContractsHandler'

class BalanceWatcher {
  isWatching = false
  timer = null
  _getCoinBalance = async (userAddress) => {
    try {
      const onChainData = await OnChainDataHandler.getDataFromContract(ContractsHandler.coin, userAddress)
      return onChainData
    } catch (err) {
      throw new Error('Probably you are in wrong network, because contracts cannot be initialized')
    }
  }

  _getBalanceOfKey = async (key, userAddress) => {
    try {
      const onChainData = await OnChainDataHandler.getDataFromContract(ContractsHandler.exps[key], userAddress)
      return onChainData
    } catch (err) {
      throw new Error('Probably you are in wrong network, because contracts cannot be initialized')
    }
  }

  _getExpBalances = async (userAddress) => {
    try {
      const keys = Object.keys(ContractsHandler.exps)
      const onChainData = await Promise.all(keys.map(async (key) => {
        return await this._getBalanceOfKey(key, userAddress)
      }))
      return onChainData
    } catch (err) {
      throw new Error('Probably you are in wrong network, because contracts cannot be initialized')
    }
  }



  watchingBalances = async (userAddress, cb) => {
    if (!userAddress) {
      this._nextWatchStep(userAddress, cb)
    }

    if (this.isWatching === false) {
      this.isWatching = true
    }

    const coin = await this._getCoinBalance(userAddress)
    const exps = await this._getExpBalances(userAddress)

    cb({
      coin,
      exps
    })

    this._nextWatchStep(userAddress, cb)
  }

  _nextWatchStep = (userAddress, cb) => {
    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      this.watchingBalances(userAddress, cb);
    }, 5000);
  }
}

const watcher = new BalanceWatcher()
export default watcher
