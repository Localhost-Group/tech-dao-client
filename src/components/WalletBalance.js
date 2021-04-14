

function WalletBalance({ wallet }) {
    return (
        <div className="wallet">
            <h2>Address: {wallet.address}</h2>
            <h4>ETH: {wallet.ethBalance}</h4>
        </div>
    );
}

export default WalletBalance;
