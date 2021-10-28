const express = require("express");
const app = express();
const PORT = 8000;
const eventRouter = require("./apis/event/routes");
const connectDB = require("./db/dataBase");
const ErrorHandler = require("./middleware/ErrorHandler");
const Logger = require("./middleware/Logger");

app.use(express.json());

app.use("/api/events", eventRouter);
// app.use("api/events/fullyBooked", eventRouter);
app.use(Logger);

app.use(ErrorHandler);
connectDB();
app.listen(PORT, () => {
	console.log(`This App is Working Under Port ${PORT}`);
});
