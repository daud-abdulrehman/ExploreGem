const mongoose = require("mongoose");
const { Schema } = mongoose;

const buscompanySchema = new Schema({
  companyname: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  liscenceno: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const BusCompany = mongoose.model("BusCompany", buscompanySchema);

module.exports = BusCompany;
