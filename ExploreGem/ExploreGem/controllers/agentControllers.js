const Agent = require("../modals/agentSchema");
const Plan = require("../modals/planSchema");
// const Hotel = require("../modals/hotelSchema");
// const Traveler = require("../modals/travelerSchema");
// const BusCompany = require("../modals/buscompanySchema");
// const Admin = require("../modals/adminSchema");
// const User = require("../modals/userSchema");
const jwt = require("jsonwebtoken");

const agentControllers = {};

//agent signup
agentControllers.Signup = async (req, res) => {
  const { agencyname, contact, liscenceno, userId } = req.body;

  const newAgent = { agencyname, contact, liscenceno, userId };
  const agent = await Agent.create(newAgent);
  const typeIdtoken = jwt.sign({ typeId: userId }, "Secret-Key", {
    expiresIn: "1h",
  });
  res.json({ agent, typeIdtoken });
};

agentControllers.Addplans = async (req, res) => {
  const {
    departurecity,
    destinationcity,
    date,
    triplength,
    visitplaces,
    tripcost,
    food,
    plannedactivities,
    image,
    agentId,
  } = req.body;
  const newPlan = {
    departurecity,
    destinationcity,
    date,
    triplength,
    visitplaces,
    tripcost,
    food,
    plannedactivities,
    image,
    agentId,
  };
  const plan = await Plan.create(newPlan);
  res.send({ msg: "Plan Added Successfully", plan });
};
module.exports = agentControllers;
