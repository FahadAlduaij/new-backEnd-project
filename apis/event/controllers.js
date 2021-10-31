const mongoose = require("mongoose");
const { findById } = require("../../db/models/Event");
const Event = require("../../db/models/Event");

// Param Function
exports.findEvent = async (eventId, next) => {
	try {
		const event = await Event.findById(eventId);
		return event;
	} catch (error) {
		next(error);
	}
};

// Fetch All Data
exports.fetchEvent = async (req, res, next) => {
	try {
		const events = await Event.find();
		if (events.length > 0) {
			return res.status(200).json(events);
		} else {
			next({
				status: 404,
				message: "There is No Data",
			});
		}
	} catch (error) {
		next(error);
	}
};

// Fetch Spesific Data
exports.fetchEventID = async (req, res, next) => {
	try {
		return res.status(200).json(req.event);
	} catch (error) {
		next(error);
	}
};

// Fetch Only Fully Booked Data
exports.fetchFullyBooked = async (req, res, next) => {
	try {
		const fullyBooked = await Event.find({
			$expr: { $eq: ["$numOfSeats", "$bookedSeats"] },
		});
		if (fullyBooked) {
			return res.status(200).json(fullyBooked);
		} else {
			next({
				status: 404,
				message: "There is No Fully Booked Events",
			});
		}
	} catch (error) {
		next(error);
	}
};

// Fetch By Name Only
exports.fetchByName = async (req, res, next) => {
	try {
		const query = req.params.query;
		const filtered = await Event.find({
			name: query,
		}).exec();
		return res.status(200).json(filtered);
	} catch (error) {
		next(error);
	}
};

// Creat New Event
exports.createEvent = async (req, res, next) => {
	try {
		const newEvent = await Event.create(req.body);
		console.log(req.body);
		return res.status(201).json(newEvent);
	} catch (error) {
		next(error);
	}
};

// Delete Event
exports.deleteEvent = async (req, res, next) => {
	try {
		await Event.remove(req.event);
		return res.status(204).end();
	} catch (error) {
		next(error);
	}
};

// Update Event
exports.updateEvent = async (req, res, next) => {
	const eventID = req.params.eventID;
	try {
		const updateEvent = await Event.findByIdAndUpdate(
			{ _id: eventID },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (updateEvent) {
			return res.status(200).json(updateEvent);
		} else {
			next({
				status: 404,
				message: "Event Not Found",
			});
		}
	} catch (error) {
		next(error);
	}
};
