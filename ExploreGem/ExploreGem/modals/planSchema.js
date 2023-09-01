const mongoose = require("mongoose");
const { Schema } = mongoose;

const planSchema = new Schema({
  departurecity: {
    type: String,
    required: true,
  },
  destinationcity: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  triplength: {
    type: Number,
    required: true,
  },
  visitplaces: {
    type: String,
    required: true,
  },
  tripcost: {
    type: Number,
    required: true,
  },
  food: {
    type: String,
    required: true,
  },
  plannedactivities: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
