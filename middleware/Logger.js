const Logger = (req, res, next) => {
	res.status(404).json({ message: "Path Not Found" });
	next();
};

module.exports = Logger;
