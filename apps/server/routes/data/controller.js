const DataService = require('./service');
const dataService = new DataService();

class DataController {
	
	async richQueryWithPagination(req, res, next){
		const queryInfo = req.body;
		let result = null;
		try {
			result = await dataService.richQueryWithPagination(queryInfo);
		} catch (e) {
			next(e);
			return null;
		}
		res.status(200).json(result);
	}
}

module.exports = DataController;