"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

// Get a Web3 instance for the contracts
let contractProvider = new Web3('https://muddy-fragrant-firefly.matic.quiknode.pro/');

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;

// Wheat ABI code
let wheatABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"controller","type":"address"}],"name":"addController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hardcap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"controller","type":"address"}],"name":"removeController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Minter Contract ABI code
let minterABI = [{"inputs":[{"internalType":"address","name":"_wheat","type":"address"},{"internalType":"address payable","name":"_generator","type":"address"},{"internalType":"address","name":"_vrfcoordinator","type":"address"},{"internalType":"address","name":"_linkToken","type":"address"},{"internalType":"uint256","name":"_maxTokens","type":"uint256"},{"internalType":"bytes32","name":"_keyhash","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"success","type":"bool"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"Response","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"MAX_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINT_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAID_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"SendTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_dummy","type":"string"}],"name":"changeDummyURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"characters","outputs":[{"internalType":"contract ICharacter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dummyURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"existingCombinations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"generator","outputs":[{"internalType":"contract Generator","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPaidTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTokenComponents","outputs":[{"components":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"uint8","name":"base","type":"uint8"},{"internalType":"uint8","name":"eyes","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"cloth","type":"uint8"},{"internalType":"uint8","name":"boots","type":"uint8"},{"internalType":"uint8","name":"hat","type":"uint8"},{"internalType":"uint8","name":"beard","type":"uint8"},{"internalType":"uint8","name":"shield","type":"uint8"},{"internalType":"uint8","name":"weapon","type":"uint8"},{"internalType":"uint256","name":"charisma","type":"uint256"}],"internalType":"struct ICharacter.Character","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_tokenId","type":"uint16"}],"name":"getTokenSeed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mintCost","outputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minted","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"uint256","name":"randomness","type":"uint256"}],"name":"rawFulfillRandomness","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reveal","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"tokenId","type":"uint16"}],"name":"revealToken","outputs":[{"components":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"uint8","name":"base","type":"uint8"},{"internalType":"uint8","name":"eyes","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"cloth","type":"uint8"},{"internalType":"uint8","name":"boots","type":"uint8"},{"internalType":"uint8","name":"hat","type":"uint8"},{"internalType":"uint8","name":"beard","type":"uint8"},{"internalType":"uint8","name":"shield","type":"uint8"},{"internalType":"uint8","name":"weapon","type":"uint8"},{"internalType":"uint256","name":"charisma","type":"uint256"}],"internalType":"struct ICharacter.Character","name":"t","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"seedRequests","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"togglePause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleReveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenCharacteristic","outputs":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"uint8","name":"base","type":"uint8"},{"internalType":"uint8","name":"eyes","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"cloth","type":"uint8"},{"internalType":"uint8","name":"boots","type":"uint8"},{"internalType":"uint8","name":"hat","type":"uint8"},{"internalType":"uint8","name":"beard","type":"uint8"},{"internalType":"uint8","name":"shield","type":"uint8"},{"internalType":"uint8","name":"weapon","type":"uint8"},{"internalType":"uint256","name":"charisma","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"tokenSeeds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wheat","outputs":[{"internalType":"contract WHEAT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

/**
 * Setup the orchestra
 */
function init() {

  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Fortmatic is", Fortmatic);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
  if(location.protocol !== 'https:') {
    document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
    return;
  }

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // For WalletConnect
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    },

    fortmatic: {
      package: Fortmatic,
      options: {
        // Live
        key: "pk_live_E5C42FBC60E22802"
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
  const chainData = evmChains.getChain(chainId);

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  document.querySelector("#accoutname").textContent = selectedAccount.substring(0,4) + "..." + selectedAccount.slice(-4);

  // Go through all accounts and get their $Wheat balance
  const rowResolvers = accounts.map(async (address) => {
    const balance = await new contractProvider.eth.Contract(wheatABI, '0x98dd4371579d35883BF37c84666b0300Ea619fFa').methods.balanceOf(address).call();

    let minted = await new  contractProvider.eth.Contract(minterABI, '0x0594FEe490F57f4eD3BDDDA0C3372480Aea6aD96').methods.minted.call().call();
      console.log("Total Minted: " + minted);
      document.querySelector("#progress-number").textContent = minted + "/10,000";
      document.getElementById('minprogress').style.width = minted / 100 +'%';
      document.querySelector("#minprogress").ariaValueNow = minted;

    if(minted >= 10000)
    {
      document.querySelector("#mintButton").setAttribute("disabled", "disabled");
    }

    // Getting NFT Balances
    const nftBalance = await new contractProvider.eth.Contract(minterABI, '0x0594FEe490F57f4eD3BDDDA0C3372480Aea6aD96').methods.balanceOf(address).call();
    console.log("NFT BALANCE: " + nftBalance);
    // Getting each tokenID
    const  userTokens = [];
    for(let i=0; i < nftBalance; i++)
    {
      userTokens.push(await new contractProvider.eth.Contract(minterABI, '0x0594FEe490F57f4eD3BDDDA0C3372480Aea6aD96').methods.tokenOfOwnerByIndex(address, i).call());
      console.log(i + " => " + userTokens[i]);
    }

    // Check that each token is revealed
    const  isRevealed = [];
    for(let i=0; i < userTokens.length; i++)
    {
      console.log("Checking revealed token!");
      let traits = await new contractProvider.eth.Contract(minterABI, '0x0594FEe490F57f4eD3BDDDA0C3372480Aea6aD96').methods.getTokenComponents(userTokens[i]).call();
      if(traits[0] == 0 && traits[1] == 0 && traits[2] == 0 && traits[3] == 0 && traits[4] == 0 && traits[5] == 0 && traits[6] == 0 && traits[7] == 0 && traits[8] == 0)  // => All traits 0 means still not defined.
      {
        isRevealed.push(false);
      }
      else
      {
        isRevealed.push(true);
      }

      console.log(i + " => " + isRevealed[i]);
    }

    //Check that reveal is enabled
    let revealEnabled = await new contractProvider.eth.Contract(minterABI, '0x0594FEe490F57f4eD3BDDDA0C3372480Aea6aD96').methods.reveal.call().call();

    // Chech that user has any item
    let InventoryOutput;
    if(userTokens.length > 0)
    {
      //Inventory outoutput
      InventoryOutput = "<div class=\"row\">";

      for(let i=0; i < userTokens.length; i++)
      {
        // Check revealed or not
        if(isRevealed[i])
        {
         // If character is already revealed, group as roles and ask for staking. TO BE DONE!
        }
        else
        {
          InventoryOutput = InventoryOutput + "<div class=\"card bg-dark\" style=\"width: 18rem;\"><br><img src=\"./unrevealed.png\" class=\"card-img-top\" alt=\"Unknown Citizen\"><div class=\"card-body\"><p class=\"card-text\">Your citizens need an identity. Reveal it to see its attributes.<br><br><button class=\"btn btn-warning\" ";
          // If reveal is not enabled, render button as disabled
          if(!revealEnabled)
          {
           InventoryOutput = InventoryOutput + "disabled";
          }
          InventoryOutput = InventoryOutput + ">Reveal</button></p></div></div>&nbsp;&nbsp;&nbsp;";
        }
      }
      InventoryOutput = InventoryOutput + "</div><br><br><br>";
    }
    else
    {
      InventoryOutput = "<div class=\"alert alert-warning\" role=\"alert\"\>Your inventory is empty! You can mint a citizen or buy from <a href=\"https://opensea.io/collection/citizens-v2-2\" target=\"_blank\">@opensea</div>";
    }

    document.getElementById("inventory").innerHTML = InventoryOutput;
    document.getElementById("inventorytab").style.visibility = "visible";
    document.getElementById("itemnumber").innerHTML = userTokens.length;
    // ethBalance is a BigNumber instance
    // https://github.com/indutny/bn.js/
    const ethBalance = web3.utils.fromWei(balance, "ether");
    const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
    // Get balance
    document.querySelector("#accountbalance").style.visibility = "visible";
    document.querySelector("#wheatBalance").textContent = humanFriendlyBalance;
  });

  // Because rendering account does its own RPC commucation
  // with Ethereum node, we do not want to display any results
  // until data for all accounts is loaded
  await Promise.all(rowResolvers);

  // Display fully loaded UI for wallet data
  document.querySelector("#prepare").style.visibility = "hidden";
  document.querySelector("#connected").style.visibility = "visible";
}



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
  document.querySelector("#connected").style.visibility = "hidden";
  document.getElementById("inventorytab").style.visibility = "hidden";
  document.querySelector("#prepare").style.visibility = "visible";

  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
  document.querySelector("#btn-connect").setAttribute("disabled", "disabled");
  await fetchAccountData(provider);
  document.querySelector("#btn-connect").removeAttribute("disabled");
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
}

/**
 * Mint token when mint button pressed.
 */
 async function onMint() {
    // Get a Web3 instance for the wallet
    const web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();

    const mintCost = 10 * 10 ** 18;

    await  new web3.eth.Contract(minterABI, '0x0594FEe490F57f4eD3BDDDA0C3372480Aea6aD96').methods.mint(1).send({from: accounts[0], gas: 3000000, value: mintCost});

    await refreshAccountData();
}
/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  // Set the UI back to the initial state
  document.querySelector("#prepare").style.visibility = "visible";
  document.querySelector("#connected").style.visibility = "hidden";
  document.getElementById("inventorytab").style.visibility = "hidden";
}


/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
  document.querySelector("#mintButton").addEventListener("click", onMint);
});