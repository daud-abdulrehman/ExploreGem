const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelSchema = new Schema({
  hotelname: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  registrationno: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
