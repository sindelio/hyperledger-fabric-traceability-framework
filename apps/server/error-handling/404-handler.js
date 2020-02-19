function notFoundHandler(req, res, next){
	res.status(404).json({
		success: false,
		data: null,
		error: 'This endpoint is not available'
	});
}

module.exports = notFoundHandler;