'use strict';

const {
	Contract,
	Context,
} = require('fabric-contract-api');

/** 
 * The context is used to interact with the ledger via the stub object
 */
class DataContext extends Context {
	constructor() {
		super();
	}
}

class DataContract extends Contract {
	constructor() {
		// The parameter for super() is the smart contract name. Functions as a unique namespace, useful when multiple smart contracts are deployed within the same chaincode
		super('traceabilitysc.data'); 
	}

	/**
	 * Define a custom context for workers
	 * Called automatically before any after, before, unknown and user defined transaction(function)
	 * The chaincodeStub and client identity objects are injected in a ctx object by this function
	 */
	createContext() {
		return new DataContext();
	}

	/**
	 * Instantiate to perform any setup of the ledger that might be required.
	 * @param {Context} ctx the transaction context
	 */
	async instantiate(ctx) {
		// It could be where data migration/initialization is performed, if necessary
		// Although a good practice is to have a separate method for ledger state initialization
		console.log('Instantiate the contract');
	}

	async richQueryWithPagination(ctx, queryInfoJson){
		// console.log(queryInfoJson);
		const queryInfo = JSON.parse(queryInfoJson);
		const queryJson = JSON.stringify(queryInfo.query);
		let pageSize = 2;
		if(queryInfo.pageSize) pageSize = queryInfo.pageSize;
		let bookmark = '';
		if(queryInfo.bookmark) bookmark = queryInfo.bookmark;
		// console.log(queryJson);
		// console.log(pageSize);
		// console.log(bookmark);
		const queryResult = await ctx.stub.getQueryResultWithPagination(queryJson, pageSize, bookmark);
		const queryResultMetadata = queryResult.metadata;
		const stateQueryIterator = queryResult.iterator;
		let fetchedRecords = [];
		let record = null;
		let current = null;
		while( true ){
			current = await stateQueryIterator.next();
			if(current.value && current.value.value.toString()){
				record = JSON.parse(current.value.value.toString('utf8'));
				fetchedRecords.push(record);
			}
			if(current.done) {
				stateQueryIterator.close();
				if(fetchedRecords.length === 0){	
					return {
						success: false,
						data: fetchedRecords,
						error: 'No items matching the query were found in the ledger',
					};
				} 
				else {
					return {
						success: true, 
						data: { 
							fetched_records_count: queryResultMetadata.fetched_records_count,
							bookmark: queryResultMetadata.bookmark,
							fetched_records: fetchedRecords,
						},
						error: null,
					}
				}
			}
		}
	}

	async richQuery(ctx, queryJson){
		const stateQueryIterator = await ctx.stub.getQueryResult(queryJson);
		let matches = [];
		let match = null;
		let current = null;
		while( true ){
			current = await stateQueryIterator.next();
			if(current.value && current.value.value.toString()){
				match = JSON.parse(current.value.value.toString('utf8'));
				matches.push(match);
			}
			if(current.done) {
				stateQueryIterator.close();
				if(matches.length === 0){
					return {
						success: false,
						data: matches,
						error: 'No items matching the query were found in the ledger',
					};	
				}
				return {
					success: true, 
					data: matches,
					error: null,
				}
			}
		}
	}

	// async getHistoryForOrderKey(ctx, orderIdJson){
	// 	const orderId = JSON.parse(orderIdJson);
	// 	// console.log(orderId);
	// 	const orderKey = await ctx.stub.createCompositeKey('ffsc.order', [`${orderId}`]);
	// 	// console.log(orderKey);
	// 	const keyStateHistoryIterator = await ctx.stub.getHistoryForKey(orderKey);
	// 	// console.log(keyStateHistoryIterator);
		
	// 	let moments = [];
	// 	let moment = null;
	// 	let current = null;
	// 	while( true ){
	// 		current = await keyStateHistoryIterator.next();
	// 		if(current.value && current.value.value.toString()){
	// 			moment = JSON.parse(current.value.value.toString('utf8'));
	// 			moments.push(moment);
	// 		}
	// 		if(current.done) {
	// 			keyStateHistoryIterator.close();
	// 			if(moments.length === 0){
	// 				return {
	// 					success: false,
	// 					data: moments,
	// 					error: 'No moments for the specified key were found in the ledger',
	// 				};	
	// 			}
	// 			return {
	// 				success: true, 
	// 				data: moments,
	// 				error: null,
	// 			}
	// 		}
	// 	}
	// }
}

module.exports = DataContract;