#!/bin/bash

set -e

echo " "
echo "===== Initial updates ====="
echo " "
sudo apt update
sudo apt upgrade -y 

echo " "
echo "===== Install cURL latest stable ====="
echo " "
sudo apt install -y curl

echo " "
echo "===== Install git latest stable ====="
echo " "
sudo apt install -y git

echo " "
echo "===== Install Node v8.x ====="
echo " "
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs
sudo apt install -y build-essential

echo " "
echo "===== Install Yarn latest stable ====="
echo " "
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install -y yarn

echo " "
echo "===== Install Golang v1.11.x ====="
echo " "
wget https://dl.google.com/go/go1.11.12.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.11.12.linux-amd64.tar.gz
rm go1.11.12.linux-amd64.tar.gz

echo " "
echo "===== Install Python v2.7.x ====="
echo " "
sudo apt install python

echo " "
echo "===== Install Docker Compose v1.24.1 ====="
echo " "
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo " "
echo "===== Install Docker latest stable ====="
echo " "
sudo apt install apt-transport-https ca-certificates gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce
# sudo apt install -y docker-ce docker-ce-cli containerd.io
set +e
sudo groupadd docker
set -e
sudo usermod -aG docker $USER

echo " "
echo "===== REQUISITES SUCCESSFULLY INSTALLED ====="
echo "===== LOG OUT AND IN AGAIN TO RELOAD THE OS GROUPS AND BASH PROFILE ====="
echo " "