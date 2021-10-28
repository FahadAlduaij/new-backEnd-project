const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
	{
		organizer: {
			type: String,
			max: 20,
			unique: true,
		},
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
