import { useState, useEffect } from 'react'
import { Web3Controller, ContractsHandler, BalanceWatcher } from './controllers'


async function init(updateWallet, initializeContracts) {
  try {
    await Web3Controller.initWeb3()

    Web3Controller.watchingAccount(updateWallet)

    await ContractsHandler.init()
    initializeContracts(true)

  } catch (err) {
    // jeśli ktoś odmówi dostepu do metamaska to trzeba mu pokazać screen zwiazny z zalogowaniem
    alert(err.message)
  }
}

async function watchBalances(wallet, updateBalances) {
  try {
    if (BalanceWatcher.isWatching) {
      return true
    }

    BalanceWatcher.watchingBalances(wallet.address, updateBalances)

  } catch (err) {
    // jeśli ktoś odmówi dostepu do metamaska to trzeba mu pokazać screen zwiazny z zalogowaniem
    alert(err.message)
  }
}

const useWeb3 = () => {
  const [wallet, updateWallet] = useState({
    address: null,
    ethBalance: 0,
    weiBalance: 0,
  })

  const [balances, updateBalances] = useState({ coin: {}, exps: [] })


  const [contractInitialized, initializeContracts] = useState(false)
  useEffect(() => {
    init(updateWallet, initializeContracts)
  }, [])

  useEffect(() => {
    if (wallet.address && contractInitialized) {
      watchBalances(wallet, updateBalances)
    }
  }, [contractInitialized, wallet])
  return { wallet, balances }
}


function App() {
  const { wallet, balances } = useWeb3()
  return (
    <div className="App">
      {JSON.stringify(wallet)}
      {JSON.stringify(balances)}
    </div>
  );
}

export default App;
