const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelSchema = new Schema({
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },

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
