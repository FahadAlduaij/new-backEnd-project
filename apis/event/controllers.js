const mongoose = require("mongoose");
const Event = require("../../db/models/Event");

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

exports.fetchEventID = async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.eventID);
		if (event) {
			return res.status(200).json(event);
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

exports.fetchFullyBooked = async (req, res, next) => {
	try {
		const fullyBooked = await Event.find({
			$expr: { $eq: ["$numOfSeats", "$bookedSeats"] },
		});

		return res.status(200).json(fullyBooked);
	} catch (error) {
		next(error);
	}
};

exports.createEvent = async (req, res, next) => {
	try {
		const newEvent = await Event.create(req.body);
		console.log(req.body);
		return res.status(201).json(newEvent);
	} catch (error) {
		next(error);
	}
};

exports.deleteEvent = async (req, res, next) => {
	try {
		const findEvent = await Event.findById(req.params.eventID);
		if (findEvent) {
			await Event.remove(findEvent);
			return res.status(204).end();
		} else {
			next({
				Status: 404,
				message: "Event Not Found",
			});
		}
	} catch (error) {
		next(error);
	}
};

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
