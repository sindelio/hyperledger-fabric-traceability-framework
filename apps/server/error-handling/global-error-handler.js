function globalErrorHandler(error, req, res, next){
	console.error(error);
	let status = 500;
	if(error.statusCode){
		status = error.statusCode;
	} 
	error = error.message || error.joi.message || error;
	res.status(status).json({
		success: false,
		data: null,
		error,
	});
}

module.exports = globalErrorHandler;