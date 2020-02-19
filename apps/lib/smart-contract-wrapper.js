'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');

class SmartContractWrapper {

  constructor(contractName){
    this.contractName = contractName;
  }

  async connectToContract(){
    const wallet = new FileSystemWallet('../identity/user1/wallet'); // A wallet stores a collection of identities for use
    const userName = 'User1@org1.example.com'; // Specify userName for network access
    const connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8')); // Load connection profile
    const connectionOptions = { // Set connection options
      identity: userName,
      wallet: wallet,
      discovery: { enabled:false, asLocalhost: true }
    };
    const gateway = new Gateway(); // A gateway defines the peers used to access Fabric networks
    await gateway.connect(connectionProfile, connectionOptions); // Connect to the blockchain-network through the gateway
    const network = await gateway.getNetwork('mychannel'); // Access Fabric network via channel "mychannel"
    const channel = await network.getChannel();
    const contract = await network.getContract('traceabilitycc', this.contractName); // Get addressability to asset contract
    return { 
      gateway,
      channel,
      contract,
    };
  }

  async submitTransaction(method, args){
    const connection = await this.connectToContract();
    const argsJson = JSON.stringify(args);
    const responseJsonBuffer = await connection.contract.submitTransaction(method, argsJson);
    const response = JSON.parse(responseJsonBuffer.toString());
    connection.gateway.disconnect();
    return response;
  }

  async evaluateTransaction(method, args){
    const connection = await this.connectToContract();
    const argsJson = JSON.stringify(args);
    const responseJsonBuffer = await connection.contract.evaluateTransaction(method, argsJson);
    const response = JSON.parse(responseJsonBuffer.toString());
    // for (const item of response.data){
    //   let block = await connection.channel.queryBlockByTxID(item.txID);
    //   item.block = block.header;
    // }
    connection.gateway.disconnect();
    return response;
  }
}

module.exports = SmartContractWrapper;




