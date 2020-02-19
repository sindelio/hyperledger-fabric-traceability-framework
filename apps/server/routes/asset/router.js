const express = require('express');
const JwtService = require('../../authentication/jwt.service');
const AssetsController = require('./controller');
const {
	addAssetValidator,
	authenticateAssetValidator,
	getAssetValidator,
	updateAssetValidator,
} = require('./validator');

const assetsRouter = express.Router();
const assetsController = new AssetsController();

assetsRouter.post('/', addAssetValidator, (req, res, next) => {
	assetsController.addAsset(req, res, next); 
});

assetsRouter.post('/login', authenticateAssetValidator, (req, res, next) => {
	assetsController.authenticateAsset(req, res, next);
});

// JWT protection for the endpoints below
const jwtService = new JwtService();
const assetJwtVerifier = jwtService.verificationMiddlewareFactory('ASSET');
assetsRouter.use(assetJwtVerifier);

assetsRouter.get('/', getAssetValidator, (req, res, next) => {
	assetsController.getAsset(req, res, next); 
});

assetsRouter.patch('/', updateAssetValidator, (req, res, next) => {
	assetsController.updateAsset(req, res, next); 
});

assetsRouter.post('/set-intermediary', (req, res, next) => {
	assetsController.setIntermediaryState(req, res, next); 
});

module.exports = assetsRouter;