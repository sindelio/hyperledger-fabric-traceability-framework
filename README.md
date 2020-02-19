<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TRACEABILITY FRAMEWORK](#traceability-framework)
  - [1. OVERVIEW](#1-overview)
  - [3. FEATURES](#3-features)
  - [4. FUTURE WORK](#4-future-work)
  - [5. PRE-REQUISITES](#5-pre-requisites)
  - [6. SETUP](#6-setup)
    - [6.1. Install Hyperledger Fabric binaries and Docker images](#61-install-hyperledger-fabric-binaries-and-docker-images)
  - [7. QUICK STARTUP](#7-quick-startup)
    - [7.1. Quickly run the Blockchain network, Blockchain Explorer and HTTP server](#71-quickly-run-the-blockchain-network-blockchain-explorer-and-http-server)
  - [8. STEP BY STEP STARTUP](#8-step-by-step-startup)
    - [8.1. Download the project](#81-download-the-project)
    - [8.2. Generate the blockchain network](#82-generate-the-blockchain-network)
    - [8.3. Install the chaincode dependencies](#83-install-the-chaincode-dependencies)
    - [8.4. Start the blockchain network](#84-start-the-blockchain-network)
    - [8.4. Start the Hyperledger Explorer GUI](#84-start-the-hyperledger-explorer-gui)
    - [8.5. Install the dependencies for the connector between the HTTP server and the Blockchain network](#85-install-the-dependencies-for-the-connector-between-the-http-server-and-the-blockchain-network)
    - [8.6. Create a static identity able to execute transactions from client applications](#86-create-a-static-identity-able-to-execute-transactions-from-client-applications)
    - [8.7. Install the HTTP server dependencies](#87-install-the-http-server-dependencies)
    - [8.8. Start the HTTP server](#88-start-the-http-server)
    - [8.9. Execute transactions in the Blockchain network](#89-execute-transactions-in-the-blockchain-network)
  - [9. TROUBLESHOOTING](#9-troubleshooting)
  - [10. CONTRIBUTING](#10-contributing)
  - [11. LICENSE](#11-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# TRACEABILITY FRAMEWORK

## 1. OVERVIEW

This project consists of a framework to build traceability applications.
The framework is built on top of Hyperledger Fabric, using most of its features.
For details on which features are used or not, take a look at the next section.
The goals of the project are:

- Speed up development of future projects through reuse of this framework.
- Share code with the community. Hyperledger Fabric, and all other Hyperledger
 frameworks and tools, are new technology rising in adoption in the market. Henceforth there are few
 rich codebases for study and reference.

This codebase is the result of a year of study and practice of Hyperledger Fabric in a real supply chain
solution for the fashion industry, and then cutting, cleaning and polishing it to be reusable.

Important note: This framework was built on top of the first-network sample,
found in the fabric-samples directory of the [official examples for Hyperledger Fabric.](https://github.com/hyperledger/fabric-samples/tree/master/first-network)

[The official documentation for Hyperledger Fabric can be found here.](https://hyperledger-fabric.readthedocs.io/en/release-1.4/)

## 3. FEATURES

- Version 1.4.2 of Hyperledger binaries and Docker images.
The framework should work well with little to no changes for versions 1.4.3 and 1.4.4 as well.
- Rich data operations with CouchDB, instead of the default database LevelDB.
- Raft ordering service.
- Chaincode fully written in Javascript, using Node.js as the running environment.
- Hyperledger Explorer attached to the Blockchain network.
Explorer provides a Graphical User Interface - GUI, to visualize
all important entities in the network, such as organizations, peers, chaincodes, channels and transactions.
- Convenience scripts to install and run the framework.
- HTTP server communicating with the Blockchain network. This server can be hosted in the cloud
in order to handle requests from client apps.
- Authentication with Json Web Token - JWT.
- Input data validation with Joi/Celebrate.
- Basic error handling.
- Postman collection and environment for convenience when making requests to the HTTP server, and hence
to the Blockchain network.

## 4. FUTURE WORK

- Migrate to version 2.0 of Hyperledger binaries and Docker images.
- Implement certificate authorities to handle identities in the network. At the moment,
there's only one static identity that the HTTP server uses to communicate with the Blockchain network.
- Implement unit tests for the smart contract functions.
- Implement end-to-end tests for the HTTP server all the way down to the Blockchain network.

## 5. PRE-REQUISITES

- [Ubuntu 16.04 Long Term Support - LTS](http://br.releases.ubuntu.com/16.04/).
The target Operating System - OS, for the project is Ubuntu 16.04 LTS, and it should work
in Ubuntu 14.04 LTS as well, although untested.

IMPORTANT: THE PROJECT WILL NOT WORK ON UBUNTU 18.04!

IMPORTANT: THIS README WILL ASSUME UBUNTU 16.04 AS THE WORKING OS.

If using Windows or Mac, [please follow the instructions listed here.](https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html#id1)
- Git 2.7.x
- cURL 7.x
- [Golang v1.11.x](https://golang.org/dl/)
- [Node.js v8.x](https://github.com/nodesource/distributions/blob/master/README.md)
- [Yarn 1.17.x](https://yarnpkg.com/lang/en/docs/install/#debian-stable)
- Python v2.7.x
Python comes pre-installed in Ubuntu, the version also should be the right one.
Check the version with:

```
  python --version
```

If not v2.7.x, install it with:

```
  sudo apt install python
```

- [Docker Community Edition - CE, v17.06.2 or greater](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
Don't forget to [create a group named docker and join the current user in it](https://docs.docker.com/install/linux/linux-postinstall/).
This will allow docker commands to be executed without `sudo`.
- [Docker Compose v1.14.0 or greater](https://docs.docker.com/compose/install/)

These dependencies can be installed with the `install-requisites.sh`:

```
  ./install-requisites.sh
```

## 6. SETUP

### 6.1. Install Hyperledger Fabric binaries and Docker images

Use the bash script `install-fabric.sh` to download the Hyperledger Fabric
binaries and Docker images:

```
  ./install-fabric.sh
```

If the installation was successful, the following message will be printed 
in your terminal:

```
  ===== HYPERLEDGER BINARIES AND DOCKER IMAGES SUCCESSFULLY INSTALLED =====
```

You can check the binaries at `~/go/fabric-samples/bin`, and the
 Docker images with:

```
  docker image ls
```

Now you are ready to start interacting with the Fabric blockchain network.

## 7. QUICK STARTUP

### 7.1. Quickly run the Blockchain network, Blockchain Explorer and HTTP server

For a quick startup, run:

```
  ./run.sh
```

Answer `y` when prompted to accept all defaults.
This script will:

- Generate the Blokchain network, with 2 organizations, each one with 1 peer, and 5 orderer nodes.
- Startup the Blockchain network with a 5 node Raft ordering service, 
create a channel named `mychannel` and set the peers of each organization to be anchor peers.
- Install and instantiate a sample chaincode that deals with general assets.
These assets can be login information, product information etc.
- Start the HTTP server to respond to client requests in port 5000. Go to 
http://localhost:5000 in your browser to receive a welcome message.
- Start the Hyperledger Explorer GUI in port 8090. Go to 
http://localhost:8090 in your browser to visualize the GUI and login to it.
Credentials:
  - Login: hppoc
  - Password: password

Although the quick start script is convenient, I'll recommend
 you study the startup process step by step in the following section.

## 8. STEP BY STEP STARTUP

### 8.1. Download the project

Move to the `~/go` directory:

```
  cd ~/go/
```

Clone the project to your machine inside the `~/go/` directory:

Using HTTPS:
``` 
  git clone https://github.com/sindelio/traceability-framework.git
```

Using SSH:
``` 
  git clone git@github.com:sindelio/traceability-framework.git
```

### 8.2. Generate the blockchain network

Move to the `blockchain-network` directory:

```
  cd ~/go/traceability-framework/blockchain-network/
```

Inside it, run:

```
  ./network.sh generate
```

The above command will create the cryptographic material for every entity in the network.
This effectively establishes the network topology, as each entity has it's identity verified by it's
cryptographic keys.
It should print an output similar to the following:

```
  Generating certs and genesis block for channel 'mychannel' with CLI timeout of '9' seconds and CLI delay of '3' seconds
  Continue? [Y/n] y
  proceeding ...
  /home/user/go/fabric-samples/bin/cryptogen

  ##########################################################
  ##### Generate certificates using cryptogen tool #########
  ##########################################################
  + cryptogen generate --config=./crypto-config.yaml
  org1.example.com
  org2.example.com
  + res=0
  + set +x

  /home/user/go/fabric-samples/bin/configtxgen
  ##########################################################
  #########  Generating Orderer Genesis block ##############
  ##########################################################
  CONSENSUS_TYPE=etcdraft
  + '[' etcdraft == solo ']'
  + '[' etcdraft == kafka ']'
  + '[' etcdraft == etcdraft ']'
  + configtxgen -profile SampleMultiNodeEtcdRaft -channelID byfn-sys-channel -outputBlock ./channel-artifacts/genesis.block
  2020-02-17 15:03:47.551 -03 [common.tools.configtxgen] main -> INFO 001 Loading configuration
  2020-02-17 15:03:47.597 -03 [common.tools.configtxgen.localconfig] completeInitialization -> INFO 002 orderer type: etcdraft
  2020-02-17 15:03:47.597 -03 [common.tools.configtxgen.localconfig] completeInitialization -> INFO 003 Orderer.EtcdRaft.Options unset, setting to tick_interval:"500ms" election_tick:10 heartbeat_tick:1 max_inflight_blocks:5 snapshot_interval_size:20971520 
  2020-02-17 15:03:47.597 -03 [common.tools.configtxgen.localconfig] Load -> INFO 004 Loaded configuration: /home/sindelio/go/traceability-framework/blockchain-network/configtx.yaml
  2020-02-17 15:03:47.632 -03 [common.tools.configtxgen.localconfig] completeInitialization -> INFO 005 orderer type: solo
  2020-02-17 15:03:47.632 -03 [common.tools.configtxgen.localconfig] LoadTopLevel -> INFO 006 Loaded configuration: /home/sindelio/go/traceability-framework/blockchain-network/configtx.yaml
  2020-02-17 15:03:47.635 -03 [common.tools.configtxgen] doOutputBlock -> INFO 007 Generating genesis block
  2020-02-17 15:03:47.636 -03 [common.tools.configtxgen] doOutputBlock -> INFO 008 Writing genesis block
  + res=0
  + set +x

  #################################################################
  ### Generating channel configuration transaction 'channel.tx' ###
  #################################################################
  + configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID mychannel
  2020-02-17 15:03:47.664 -03 [common.tools.configtxgen] main -> INFO 001 Loading configuration
  2020-02-17 15:03:47.704 -03 [common.tools.configtxgen.localconfig] Load -> INFO 002 Loaded configuration: /home/sindelio/go/traceability-framework/blockchain-network/configtx.yaml
  2020-02-17 15:03:47.744 -03 [common.tools.configtxgen.localconfig] completeInitialization -> INFO 003 orderer type: solo
  2020-02-17 15:03:47.744 -03 [common.tools.configtxgen.localconfig] LoadTopLevel -> INFO 004 Loaded configuration: /home/sindelio/go/traceability-framework/blockchain-network/configtx.yaml
  2020-02-17 15:03:47.744 -03 [common.tools.configtxgen] doOutputChannelCreateTx -> INFO 005 Generating new channel configtx
  2020-02-17 15:03:47.749 -03 [common.tools.configtxgen] doOutputChannelCreateTx -> INFO 006 Writing new channel tx
  + res=0
  + set +x

  #################################################################
  #######    Generating anchor peer update for Org1MSP   ##########
  #################################################################
  + configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID mychannel -asOrg Org1MSP
  2020-02-17 15:03:47.778 -03 [common.tools.configtxgen] main -> INFO 001 Loading configuration
  2020-02-17 15:03:47.815 -03 [common.tools.configtxgen.localconfig] Load -> INFO 002 Loaded configuration: /home/sindelio/go/traceability-framework/blockchain-network/configtx.yaml
  2020-02-17 15:03:47.850 -03 [common.tools.configtxgen.localconfig] completeInitialization -> INFO 003 orderer type: solo
  2020-02-17 15:03:47.850 -03 [common.tools.configtxgen.localconfig] LoadTopLevel -> INFO 004 Loaded configuration: /home/sindelio/go/traceability-framework/blockchain-network/configtx.yaml
  2020-02-17 15:03:47.850 -03 [common.tools.configtxgen] doOutputAnchorPeersUpdate -> INFO 005 Generating anchor peer update
  2020-02-17 15:03:47.850 -03 [common.tools.configtxgen] doOutputAnchorPeersUpdate -> INFO 006 Writing anchor peer update
  + res=0
  + set +x

  #################################################################
  #######    Generating anchor peer update for Org2MSP   ##########
  #################################################################
  + configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors.tx -channelID mychannel -asOrg Org2MSP
  2020-02-17 15:03:47.881 -03 [common.tools.configtxgen] main -> INFO 001 Loading configuration
  2020-02-17 15:03:47.918 -03 [common.tools.configtxgen.localconfig] Load -> INFO 002 Loaded configuration: /home/sindelio/go/traceability-framework/blockchain-network/configtx.yaml
  2020-02-17 15:03:47.953 -03 [common.tools.configtxgen.localconfig] completeInitialization -> INFO 003 orderer type: solo
  2020-02-17 15:03:47.953 -03 [common.tools.configtxgen.localconfig] LoadTopLevel -> INFO 004 Loaded configuration: /home/sindelio/go/traceability-framework/blockchain-network/configtx.yaml
  2020-02-17 15:03:47.954 -03 [common.tools.configtxgen] doOutputAnchorPeersUpdate -> INFO 005 Generating anchor peer update
  2020-02-17 15:03:47.954 -03 [common.tools.configtxgen] doOutputAnchorPeersUpdate -> INFO 006 Writing anchor peer update
  + res=0
  + set +x
```

### 8.3. Install the chaincode dependencies

Move to `~/go/traceability-framework/chaincode`:

```
  cd ~/go/traceability-framework/chaincode
```

Install the Node.js modules required by the chaincode:

```
  yarn install
```

This step has to be done before starting the Blockchain network, or else the chaincode 
will not have its dependencies when being installed and instantiated in the Blockchain network.

### 8.4. Start the blockchain network

Move to `~/go/traceability-framework/blockchain-network/`, start the network with:

```
  ./network up
```

The logs should look like:

```
  Starting for channel 'mychannel' with CLI timeout of '9' seconds and CLI delay of '3' seconds
  Continue? [Y/n] y
  proceeding ...
  LOCAL_VERSION=1.4.2
  DOCKER_IMAGE_VERSION=1.4.2
  Creating network "net_byfn" with the default driver
  Creating volume "net_orderer.example.com" with default driver
  Creating volume "net_orderer2.example.com" with default driver
  Creating volume "net_orderer3.example.com" with default driver
  Creating volume "net_orderer4.example.com" with default driver
  Creating volume "net_orderer5.example.com" with default driver
  Creating volume "net_peer0.org1.example.com" with default driver
  Creating volume "net_couch.peer0.org1" with default driver
  Creating volume "net_peer0.org2.example.com" with default driver
  Creating volume "net_couch.peer0.org2" with default driver
  Creating orderer.example.com  ... done
  Creating orderer4.example.com ... done
  Creating orderer3.example.com ... done
  Creating couchdb.peer0.org1     ... done
  Creating orderer5.example.com ... done
  Creating orderer2.example.com ... done
  Creating couchdb.peer0.org2   ... done
  Creating peer0.org2.example.com ... done
  Creating peer0.org1.example.com ... done
  Creating cli                    ... done
  CONTAINER ID        IMAGE                               COMMAND                  CREATED             STATUS                  PORTS                                            NAMES
  cdc5810d182e        hyperledger/fabric-tools:latest     "/bin/bash"              9 seconds ago       Up Less than a second                                                    cli
  bf3fbdc311c8        hyperledger/fabric-peer:latest      "peer node start"        17 seconds ago      Up 8 seconds            0.0.0.0:7051->7051/tcp, 0.0.0.0:9443->9443/tcp   peer0.org1.example.com
  d4a61e6c94ac        hyperledger/fabric-peer:latest      "peer node start"        19 seconds ago      Up 10 seconds           0.0.0.0:9051->9051/tcp                           peer0.org2.example.com
  bfa350c45196        hyperledger/fabric-couchdb          "tini -- /docker-ent…"   32 seconds ago      Up 18 seconds           4369/tcp, 9100/tcp, 0.0.0.0:6984->5984/tcp       couchdb.peer0.org2
  cecdc1f09994        hyperledger/fabric-orderer:latest   "orderer"                32 seconds ago      Up 21 seconds           0.0.0.0:11050->7050/tcp                          orderer5.example.com
  81f7857fc863        hyperledger/fabric-orderer:latest   "orderer"                32 seconds ago      Up 21 seconds           0.0.0.0:7050->7050/tcp, 0.0.0.0:8443->8443/tcp   orderer.example.com
  f155fc8e90f8        hyperledger/fabric-orderer:latest   "orderer"                32 seconds ago      Up 23 seconds           0.0.0.0:9050->7050/tcp                           orderer3.example.com
  086e767b5a67        hyperledger/fabric-orderer:latest   "orderer"                32 seconds ago      Up 22 seconds           0.0.0.0:8050->7050/tcp                           orderer2.example.com
  aa1d4c0fa98e        hyperledger/fabric-couchdb          "tini -- /docker-ent…"   32 seconds ago      Up 17 seconds           4369/tcp, 9100/tcp, 0.0.0.0:5984->5984/tcp       couchdb.peer0.org1
  82763594b409        hyperledger/fabric-orderer:latest   "orderer"                32 seconds ago      Up 20 seconds           0.0.0.0:10050->7050/tcp                          orderer4.example.com
  Sleeping 15s to allow etcdraft cluster to complete booting
  Running start.sh

  ____    _____      _      ____    _____ 
  / ___|  |_   _|    / \    |  _ \  |_   _|
  \___ \    | |     / _ \   | |_) |   | |  
  ___) |   | |    / ___ \  |  _ <    | |  
  |____/    |_|   /_/   \_\ |_| \_\   |_|  

  Fabric network startup

  Channel name : mychannel
  Creating channel...
  + peer channel create -o orderer.example.com:7050 -c mychannel -f ./channel-artifacts/channel.tx --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
  + res=0
  + set +x
  2020-02-17 18:06:29.816 UTC [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
  2020-02-17 18:06:29.831 UTC [cli.common] readBlock -> INFO 002 Got status: &{NOT_FOUND}
  2020-02-17 18:06:29.834 UTC [channelCmd] InitCmdFactory -> INFO 003 Endorser and orderer connections initialized
  2020-02-17 18:06:30.036 UTC [cli.common] readBlock -> INFO 004 Got status: &{NOT_FOUND}
  2020-02-17 18:06:30.050 UTC [channelCmd] InitCmdFactory -> INFO 005 Endorser and orderer connections initialized
  2020-02-17 18:06:31.734 UTC [cli.common] readBlock -> INFO 006 Got status: &{SERVICE_UNAVAILABLE}
  2020-02-17 18:06:31.739 UTC [channelCmd] InitCmdFactory -> INFO 007 Endorser and orderer connections initialized
  2020-02-17 18:06:31.940 UTC [cli.common] readBlock -> INFO 008 Got status: &{SERVICE_UNAVAILABLE}
  2020-02-17 18:06:31.945 UTC [channelCmd] InitCmdFactory -> INFO 009 Endorser and orderer connections initialized
  2020-02-17 18:06:32.149 UTC [cli.common] readBlock -> INFO 00a Got status: &{SERVICE_UNAVAILABLE}
  2020-02-17 18:06:32.165 UTC [channelCmd] InitCmdFactory -> INFO 00b Endorser and orderer connections initialized
  2020-02-17 18:06:32.368 UTC [cli.common] readBlock -> INFO 00c Got status: &{SERVICE_UNAVAILABLE}
  2020-02-17 18:06:32.382 UTC [channelCmd] InitCmdFactory -> INFO 00d Endorser and orderer connections initialized
  2020-02-17 18:06:32.586 UTC [cli.common] readBlock -> INFO 00e Got status: &{SERVICE_UNAVAILABLE}
  2020-02-17 18:06:32.600 UTC [channelCmd] InitCmdFactory -> INFO 00f Endorser and orderer connections initialized
  2020-02-17 18:06:32.805 UTC [cli.common] readBlock -> INFO 010 Got status: &{SERVICE_UNAVAILABLE}
  2020-02-17 18:06:32.837 UTC [channelCmd] InitCmdFactory -> INFO 011 Endorser and orderer connections initialized
  2020-02-17 18:06:33.044 UTC [cli.common] readBlock -> INFO 012 Got status: &{SERVICE_UNAVAILABLE}
  2020-02-17 18:06:33.064 UTC [channelCmd] InitCmdFactory -> INFO 013 Endorser and orderer connections initialized
  2020-02-17 18:06:33.273 UTC [cli.common] readBlock -> INFO 014 Received block: 0
  ===================== Channel 'mychannel' created ===================== 

  Having all peers join the channel...
  + peer channel join -b mychannel.block
  + res=0
  + set +x
  2020-02-17 18:06:33.419 UTC [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
  2020-02-17 18:06:35.440 UTC [channelCmd] executeJoin -> INFO 002 Successfully submitted proposal to join channel
  ===================== peer0.org1 joined channel 'mychannel' ===================== 

  + peer channel join -b mychannel.block
  + res=0
  + set +x
  2020-02-17 18:06:38.600 UTC [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
  2020-02-17 18:06:42.204 UTC [channelCmd] executeJoin -> INFO 002 Successfully submitted proposal to join channel
  ===================== peer0.org2 joined channel 'mychannel' ===================== 

  Updating anchor peers for org1...
  + peer channel update -o orderer.example.com:7050 -c mychannel -f ./channel-artifacts/Org1MSPanchors.tx --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
  + res=0
  + set +x
  2020-02-17 18:06:45.297 UTC [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
  2020-02-17 18:06:45.483 UTC [channelCmd] update -> INFO 002 Successfully submitted channel update
  ===================== Anchor peers updated for org 'Org1MSP' on channel 'mychannel' ===================== 

  Updating anchor peers for org2...
  + peer channel update -o orderer.example.com:7050 -c mychannel -f ./channel-artifacts/Org2MSPanchors.tx --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
  + res=0
  + set +x
  2020-02-17 18:06:48.649 UTC [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
  2020-02-17 18:06:48.663 UTC [channelCmd] update -> INFO 002 Successfully submitted channel update
  ===================== Anchor peers updated for org 'Org2MSP' on channel 'mychannel' ===================== 

  Installing chaincode on peer0.org1...
  + peer chaincode install -n traceabilitycc -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/
  2020-02-17 18:06:51.786 UTC [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
  2020-02-17 18:06:51.786 UTC [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc
  2020-02-17 18:06:52.434 UTC [chaincodeCmd] install -> INFO 003 Installed remotely response:<status:200 payload:"OK" > 
  + res=0
  + set +x
  2020-02-17 18:06:48.649 UTC [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
  2020-02-17 18:06:48.663 UTC [channelCmd] update -> INFO 002 Successfully submitted channel update
  ===================== Chaincode is installed on peer0.org1 ===================== 

  Install chaincode on peer0.org2...
  + peer chaincode install -n traceabilitycc -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/
  2020-02-17 18:06:52.522 UTC [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
  2020-02-17 18:06:52.522 UTC [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc
  2020-02-17 18:06:53.219 UTC [chaincodeCmd] install -> INFO 003 Installed remotely response:<status:200 payload:"OK" > 
  + res=0
  + set +x
  2020-02-17 18:06:48.649 UTC [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
  2020-02-17 18:06:48.663 UTC [channelCmd] update -> INFO 002 Successfully submitted channel update
  ===================== Chaincode is installed on peer0.org2 ===================== 

  Instantiating chaincode on peer0.org1...
  + peer chaincode instantiate -o orderer.example.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n traceabilitycc -l node -v 1.0 -c '{"Args":[]}' -P 'AND ('\''Org1MSP.peer'\'','\''Org2MSP.peer'\'')'
  + res=0
  + set +x
  2020-02-17 18:06:53.346 UTC [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
  2020-02-17 18:06:53.346 UTC [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc
  ===================== Chaincode is instantiated on peer0.org1 on channel 'mychannel' ===================== 


  ========= All GOOD, Fabric network started =========== 


  _____   _   _   ____   
  | ____| | \ | | |  _ \  
  |  _|   |  \| | | | | | 
  | |___  | |\  | | |_| | 
  |_____| |_| \_| |____/
```

### 8.4. Start the Hyperledger Explorer GUI

Move to `~/go/traceability-framework/blockchain-explorer/`:

```
  cd ~/go/traceability-framework/blockchain-explorer/
```

And run:

```
  node copy-admin-secret-key.js
```

This program will copy the admin secret key from 
`/home/user/go/traceability-framework/blockchain-network/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore`
 to a connection profile located at `/home/user/go/traceability-framework/blockchain-explorer/examples/net1/connection-profile/traceability-network.json`
that allows the Explorer access to the Blockchain network data.
Next, start the Explorer GUI and database services:

```
  docker-compose -f docker-compose.yaml up -d
```

Now you can point your browser to `http://localhost:8090` to interact with the Explorer. 
Credentials to log in the `traceability-framework` network:
  - Login: `hppoc`
  - Password: `password`

### 8.5. Install the dependencies for the connector between the HTTP server and the Blockchain network

Move to `~/go/traceability-framework/apps/lib`:

```
  cd ~/go/traceability-framework/apps/lib
```

Install the Node.js modules required by the HTTP server:

```
  yarn install
```

### 8.6. Create a static identity able to execute transactions from client applications

Still in `~/go/traceability-framework/apps/lib`, run:

```
  node create-identity.js
```

The above command will create an identity named `User1@org1.example.com` in
`~/go/traceability-framework/apps/identity`.
The log is:

```
  Identity User1@org1.example.com created at ../identity/user1/wallet
```

### 8.7. Install the HTTP server dependencies

Move to `~/go/traceability-framework/apps/server`:

```
  cd ~/go/traceability-framework/apps/server
```

And run:

```
  yarn install
```

### 8.8. Start the HTTP server

Still inside the `~/go/traceability-framework/apps/server`, run:

```
  yarn nodemon index.js
```

This program will start the HTTP server in development mode.
Now you can make requests to the HTTP server locally, and the server will pass the requests on to
the Blockchain network. All server responses are in JSON format.
The server is located in port 5000, and can be accessed locally by pointing your browser to 
`http://localhost:5000` or `127.0.0.1:5000`.
There's also a simple Postman collection and environment for convenience when making requests to the HTTP server.
The collection and enviroment are located at `~/go/traceability-framework/apps/server/utils`.

### 8.9. Execute transactions in the Blockchain network

You can make requests to the HTTP server via its API. The example API has the following requests:

- Create Asset
  - HTTP Method: POST
  - Authentication: none
  - Body type: JSON
  - Body:
    - id (string)
    - name (string)
    - password (string)
  - Response type: JSON
  - Response: Created asset data
- Authenticate Asset
  - HTTP Method: POST
  - Authentication: none
  - Body type: JSON
  - Body:
    - id (string)
    - password (string)
  - Response type: JSON
  - Response: JWT to use in the requests that require authentication (Get Asset, Update Asset and
  Set Asset to Intermediary State)
- Get Asset
  - HTTP Method: GET
  - Authentication: JWT
  - Body: none
  - Response type: JSON
  - Response: Asset data
- Update Asset
  - HTTP Method: PATCH
  - Authentication: JWT
  - Body type: JSON
  - Body:
    - name (string)
    - password (string)
  - Response type: JSON
  - Response: Updated asset data
- Set asset to Intermediary State
  - HTTP Method: POST
  - Authentication: JWT
  - Body: none
  - Response type: JSON
  - Response: update asset data, with its state changed to `INTERMEDIARY`

The requests that require creation and update of data will trigger transactions in the Blockchain network.
Transaction data is returned for every request that triggers one.
If no problem was found, you can build your own application on top of this traceability framework!

## 9. TROUBLESHOOTING

The simplest way to troubleshoot is to remove all Docker artifacts and try again.
Removing all Docker containers:

```
  docker container rm $(docker container ls -aq)
```

Removing all Docker images:

```
  docker image rm $(docker image ls -aq) -f
```

Removing all non-default Docker networks:

```
  docker network rm $(docker network ls -aq) -f
```

Removing all Docker volumes:

```
  docker volume rm $(docker volume ls -a)
```

If nothing works, please feel free to ping the project's developer:

```
  personal email <sindelio@gmail.com>
```

## 10. CONTRIBUTING

Please feel free to raise an issue or make a pull request to this framework.
All contributions are much welcome!

## 11. LICENSE

[MIT](LICENSE.md)