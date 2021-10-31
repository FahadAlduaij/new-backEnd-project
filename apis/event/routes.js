const express = require("express");
const router = express.Router();
const {
	fetchEvent,
	fetchEventID,
	fetchFullyBooked,
	createEvent,
	deleteEvent,
	updateEvent,
	fetchByName,
	findEvent,
} = require("./controllers");

// Param MiddleWare
router.param("eventID", async (req, res, next, eventID) => {
	const event = await findEvent(eventID, next);
	if (event) {
		req.event = event;
		next();
	} else {
		next({
			status: 404,
			message: "Event Not Found!",
		});
	}
});

// Routes
router.get("/name/:query", fetchByName);
router.get("/fullyBooked", fetchFullyBooked);
router.get("/:eventID", fetchEventID);
router.get("/", fetchEvent);
router.post("/", createEvent);
router.delete("/:eventID", deleteEvent);
router.put("/:eventID", updateEvent);

module.exports = router;
