'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

// Set global constants 
const networkPath = path.resolve(__dirname, '../../blockchain-network');
const identityPath = '../identity/user1/wallet';
const identityLabel = 'User1@org1.example.com';

// Creates a wallet which stores a collection of identities
const wallet = new FileSystemWallet(identityPath);

async function main() {
  try {
    // Identity to credentials to be stored in the wallet
    const credPath = path.join(networkPath, '/crypto-config/peerOrganizations/org1.example.com/users/User1@org1.example.com');
    const cert = fs.readFileSync(path.join(credPath, '/msp/signcerts/User1@org1.example.com-cert.pem')).toString();
    const keyFileNameArray = fs.readdirSync(path.join(credPath, '/msp/keystore/'));
    const keyFileName = keyFileNameArray[0];
    const key = await fs.readFileSync(path.join(credPath, `/msp/keystore/${keyFileName}`)).toString();

    // Load credentials for the created identity into the wallet
    const identity = X509WalletMixin.createIdentity('Org1MSP', cert, key);
    await wallet.import(identityLabel, identity);
  } 
  catch (e) {
    console.error(e);
  }
}

main()
  .then(() => {
    console.log(`Identity ${identityLabel} created at ${identityPath}`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(-1);
  });