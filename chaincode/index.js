'use strict';

const AssetContract = require('./smart-contracts/asset-contract');
const DataContract = require('./smart-contracts/data-contract');

module.exports.contracts = [
	AssetContract,
	DataContract,
];