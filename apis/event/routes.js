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
} = require("./controllers");

// Routes
router.get("/name/:query", fetchByName);
router.get("/fullyBooked", fetchFullyBooked);
router.get("/:eventID", fetchEventID);
router.get("/", fetchEvent);
router.post("/", createEvent);
router.delete("/:eventID", deleteEvent);
router.put("/:eventID", updateEvent);

module.exports = router;
