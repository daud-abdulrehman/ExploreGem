const mongoose = require("mongoose");
const { Schema } = mongoose;

const agentSchema = new Schema({
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },

  agencyname: {
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

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;
