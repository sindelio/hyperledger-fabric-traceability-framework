#!/bin/bash

echo
echo " ____    _____      _      ____    _____ "
echo "/ ___|  |_   _|    / \    |  _ \  |_   _|"
echo "\___ \    | |     / _ \   | |_) |   | |  "
echo " ___) |   | |    / ___ \  |  _ <    | |  "
echo "|____/    |_|   /_/   \_\ |_| \_\   |_|  "
echo
echo "Fabric chaincode upgrade"
echo

CHANNEL_NAME="$1"
DELAY="$2"
LANGUAGE="$3"
TIMEOUT="$4"
VERBOSE="$5"
: ${CHANNEL_NAME:="mychannel"}
: ${DELAY:="3"}
: ${LANGUAGE:="node"}
: ${TIMEOUT:="10"}
: ${VERBOSE:="false"}

LANGUAGE=`echo "$LANGUAGE" | tr [:upper:] [:lower:]`
COUNTER=1
MAX_RETRY=10

# Chaincode can have whatever name as long as it doesn't have '-'. 
# It breakes the namespaces for the smart contract
CC_NAME="traceabilitycc"
CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/"
CC_VERSION="2.0"

echo "Channel name : "$CHANNEL_NAME

# import utils
. scripts/utils.sh

## Install the new chaincode on all endorser peers
echo "Installing new chaincode on peer0.org1..."
installChaincode 0 1 $CC_VERSION
echo "Install new chaincode on peer0.org2..."
installChaincode 0 2 $CC_VERSION

# Instantiate the new chaincode on peer0.org1
echo "Instantiating the new chaincode on peer0.org1..."
upgradeChaincode 0 1 $CC_VERSION
echo "Instantiating the new chaincode on peer0.org2..."
upgradeChaincode 0 2 $CC_VERSION

echo
echo "========= All GOOD, chaincode upgrade completed =========== "
echo

echo
echo " _____   _   _   ____   "
echo "| ____| | \ | | |  _ \  "
echo "|  _|   |  \| | | | | | "
echo "| |___  | |\  | | |_| | "
echo "|_____| |_| \_| |____/  "
echo

exit 0
