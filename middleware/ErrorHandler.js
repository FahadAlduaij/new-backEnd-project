const ErrorHandler = (err, req, res, next) => {
	res
		.status(err.status || 500)
		.json(err.message || { message: "There is an Internal Server Error" });
	next();
};

module.exports = ErrorHandler;
