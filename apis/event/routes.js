const express = require("express");
const router = express.Router();
const {
	fetchEvent,
	fetchEventID,
	fetchFullyBooked,
	createEvent,
	deleteEvent,
	updateEvent,
} = require("./controllers");

// Routes
router.get("/fullyBooked", fetchFullyBooked);
router.get("/", fetchEvent);
router.get("/:eventID", fetchEventID);
router.post("/", createEvent);
router.delete("/:eventID", deleteEvent);
router.put("/:eventID", updateEvent);

module.exports = router;
