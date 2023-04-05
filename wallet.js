require('dotenv').config();
const Web3 = require('web3');

const apikey=process.env['api_key'];
const network ='goreli';

// Creating a Node to Make Connection using getblock.io for connecting to the blockchain world
const node =`https://eth.getblock.io/${apikey}/${network}/`

const web3= new Web3(node);

// console.log(web3); 
const accountTo = web3.eth.accounts.create();

// console.log(accountTo);

const privatekey = process.env['privatekey'];

const accoutnFrom = web3.eth.accounts.privateKeyToAccount(privatekey);

// console.log(accoutnFrom);

//  for signing  a transaction
const createSignedTrx = async(rawTx) => {
    rawTx.gas = await web3.eth.estimateGas(rawTx);
    return await accoutnFrom.signTransaction(rawTx);
}
// sending signed transaction 
const sendSignedTrx = async(signedTrx) => {
    web3.eth.sendSignedTransaction(signedTrx.rawTransaction).then(console.log);
}

const amtTo ='0.01';

const rawTx ={
    to:accountTo.address,
    value:web3.utils.toWei(amtTo,"ether")
}

createSignedTrx(rawTx).then(sendSignedTrx);