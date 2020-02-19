const express = require('express');
// const JwtService = require('../../authentication/jwt.service');
const DataController = require('./controller');
const {
	richQueryValidator,
} = require('./validator');

const dataRouter = express.Router();
const dataController = new DataController();

dataRouter.post('/rich-query', richQueryValidator, (req, res, next) => {
	dataController.richQueryWithPagination(req, res, next);
});

module.exports = dataRouter;