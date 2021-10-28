const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
	{
		organizer: String,
		name: String,
		email: String,
		image: String,
		numOfSeats: Number,
		bookedSeats: Number,
		startDate: { type: Date, default: Date.now },
		endDate: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
