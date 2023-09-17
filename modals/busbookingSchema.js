const mongoose = require("mongoose");
const { Schema } = mongoose;

const busbookingSchema = new Schema({
  noofseats: {
    type: Number,
    required: true,
  },
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: true,
  },
  travelerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Traveler",
    required: true,
  },
});

const BusBooking = mongoose.model("BusBooking", busbookingSchema);

module.exports = BusBooking;
