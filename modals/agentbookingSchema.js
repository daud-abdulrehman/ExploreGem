const mongoose = require("mongoose");
const { Schema } = mongoose;

const agentbookingSchema = new Schema({
  travelerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Traveler",
    required: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
});

const AgentBooking = mongoose.model("AgentBooking", agentbookingSchema);

module.exports = AgentBooking;
