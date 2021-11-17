const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

let provider;
let web3
const connectBtn = document.getElementById('btn-connect')
const beginMenu = document.getElementById('begin-menu')
const Menu = document.getElementById('menu')

const transactionBtn = document.getElementById('btn-transaction')
const checkBalanceBtn = document.getElementById('btn-check-balance')
const signBtn = document.getElementById('btn-sign')



const accountIdAlert = document.getElementById('accountid')
const chainIdAlert = document.getElementById('chainid')
const networkIdAlert = document.getElementById('networkid')

// function web3func() {
// return web3;
// }

async function fetchAccountData() {

    console.log("Web3 instance is", web3);
    const accounts = await web3.eth.getAccounts();
    const chain_id = await web3.eth.getChainId();
    const network_id = await web3.eth.net.getId();
    // Load chain information over an HTTP API

    beginMenu.style.display = "none";
    Menu.style.display = "";

    accountIdAlert.innerHTML = "Accounts : " + accounts[0]
    chainIdAlert.innerHTML = "Chain Id : " + chain_id;
    networkIdAlert.innerHTML = "Network : " + network_id;
}

function toggleBtn() {
    // web3func()
    connectBtn.addEventListener('click', onConnect)
    transactionBtn.addEventListener('click', transaction)
    checkBalanceBtn.addEventListener('click', checkBalances)

}

async function transaction() {
    const accounts = await web3.eth.getAccounts();
    let send_to = document.getElementById('address-transaction').value
    let value = document.getElementById('total-eth').value
    await web3.eth.sendTransaction({
        from: accounts[0],
        to: send_to,
        value: value * Math.pow(10, 18),
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(error)
    });
}

async function checkBalances() {
    const accounts = await web3.eth.getAccounts()
    var balance = await web3.eth.getBalance(accounts[0])
    document.getElementById('balance-alert').innerHTML = balance / Math.pow(10, 18) + " ETH"
}

// function init() {
const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: "cc1b3c38fc9440248a4afdfa01890448",
        }
    }
};


const web3modal = new Web3Modal({
    providerOptions,
    disableInjectedProvider: false,
    cacheProvider: false,
});

async function onConnect() {
    try {
        provider = await web3modal.connect();
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }
    web3 = new Web3(provider);

    fetchAccountData();
    provider.on("accountsChanged", (accounts) => {
        fetchAccountData();
    });
    provider.on("chainChanged", (accounts) => {
        fetchAccountData();
    });
}


window.addEventListener('DOMContentLoaded', () => {
    toggleBtn()

});