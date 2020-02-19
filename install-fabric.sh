#!/bin/bash

set -e

echo " "
echo "===== Download Hyperledger binaries and Docker images ====="
echo " "
mkdir -p ~/go/
cd ~/go/
# curl -sSL http://bit.ly/2ysbOFE | bash -s -- <fabric_version> <fabric-ca_version> <thirdparty_version>
curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.2 1.4.2 0.4.15

# Or only Hyperledger Fabric Docker images v1.4.2
# docker pull hyperledger/fabric-tools:1.4.2
# docker pull hyperledger/fabric-orderer:1.4.2
# docker pull hyperledger/fabric-peer:1.4.2

echo " "
echo "===== Set PATH and GOPATH environment variables ====="
echo " "
echo "## MANUALLY CHANGED
# GOPATH as only 1 dir for Hyperledger Fabric
export GOPATH=\${HOME}/go
# PATH for the Go binary
export PATH=\${PATH}:/usr/local/go/bin
# PATH for the Hyperledger Fabric binaries
export PATH=\${PATH}:\${GOPATH}/fabric-samples/bin" >> ~/.profile
source ~/.profile

echo " "
echo "===== HYPERLEDGER BINARIES AND DOCKER IMAGES SUCCESSFULLY INSTALLED ====="
echo " "


