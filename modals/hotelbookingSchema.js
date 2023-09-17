const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelbookingSchema = new Schema({
  travelerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Traveler",
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
});

const HotelBooking = mongoose.model("HotelBooking", hotelbookingSchema);

module.exports = HotelBooking;
