#!/bin/bash

set -e

echo " "
echo "===== Running Traceability framework's back-end in development mode ====="
echo " "

cd ./blockchain-explorer/
docker-compose -f docker-compose.yaml down
# The above command is necessary to remove active endpoints in the net_byfn Docker network before attempting to remove it
cd ../blockchain-network/ 
./network.sh down
./network.sh generate
./network.sh up
cd ../blockchain-explorer/
node copy-admin-secret-key.js
docker-compose -f docker-compose.yaml up -d
cd ../apps/lib/
node create-identity.js 
cd ../server
yarn nodemon index.js

# echo " "
# echo "===== All GOOD, Traceability framework's back-end is running ====="
# echo " "

# exit 0