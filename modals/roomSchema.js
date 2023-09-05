const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  bedtype: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    reuired: true,
  },
  image: {
    type: String,
    default: "",
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
