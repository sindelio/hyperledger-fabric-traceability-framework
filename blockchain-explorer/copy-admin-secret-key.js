'use strict';

const fs = require('fs');
const childProcess = require('child_process');

const copyKeyPromise = new Promise((resolve, reject) => {
  fs.readdir('../blockchain-network/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore', 'utf8', (error, files) => {
    if(error) reject(error);
    // console.log(files);
    childProcess.exec(`jq '.organizations.Org1MSP.adminPrivateKey.path = "/tmp/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/${files[0]}"' ./examples/net1/connection-profile/first-network.json > ./examples/net1/connection-profile/traceability-network.json`, 
    (error, data) => {
      if(error) reject(error);
      // console.log(data);
      // console.log('User1 admin key copied successfully to the Explorer connection profile');
      resolve('User1 admin key copied successfully to the Explorer connection profile');
    });
  });  
});

copyKeyPromise.then((result) => {
  console.log(result);
});



/* Callbacks version

fs.readdir('../blockchain-network/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore', 'utf8', (error, files) => {
  if(error) throw new Error(error);
  // console.log(files);
  childProcess.exec(`jq '.organizations.Org1MSP.adminPrivateKey.path = "/tmp/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/${files[0]}"' ./examples/net1/connection-profile/first-network.json > ./examples/net1/connection-profile/traceability-network.json`, 
  (error, data) => {
    // console.log(data);
    console.log('User1 admin key copied successfully to the Explorer connection profile');
  });
});

*/
