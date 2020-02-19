const SmartContractWrapper = require('../../../lib/smart-contract-wrapper');
// const JwtService = require('../../authentication/jwt.service');
// const {
// 	BadRequest,
// 	NotFound,
// } = require('../../error-handling/errors');

const dataContractWrapper = new SmartContractWrapper('traceabilitysc.data');

class DataService {

	async richQueryWithPagination(queryInfo){
		const result = await dataContractWrapper.evaluateTransaction('richQueryWithPagination', queryInfo);
		return result;
	}
}

module.exports = DataService;
