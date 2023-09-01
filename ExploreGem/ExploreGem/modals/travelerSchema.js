const mongoose = require("mongoose");
const { Schema } = mongoose;

const travelerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  cnic: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Traveler = mongoose.model("Traveler", travelerSchema);

module.exports = Traveler;
