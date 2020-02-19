class BadRequest extends Error {
	static get statusCode(){
		return 400;
	}
	get statusCode(){
		return 400;
	}
}

// class Unauthorized extends Error {
// 	get statusCode(){
// 		return 401;
// 	}
// }
	
// class Forbidden extends Error {
// 	get statusCode(){
// 		return 403;
// 	}
// }
	
class NotFound extends Error {
	static get statusCode(){
		return 404;
	}
	get statusCode(){
		return 404;
	}
}

// class BlockchainError extends Error {
// 	static get statusCode(){
// 		return 500;
// 	}
// 	get statusCode(){
// 		return 500;
// 	}
// }

// console.log(BadRequest.statusCode);

module.exports = {
	BadRequest,
	// Unauthorized,
	// Forbidden,
	NotFound,
	// BlockchainError,
}