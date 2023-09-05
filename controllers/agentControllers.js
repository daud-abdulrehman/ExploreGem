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
  const typeIdtoken = jwt.sign({ typeId: agent._id }, "Secret-Key", {
    expiresIn: "1h",
  });
  res.json({ agent, typeIdtoken });
};

agentControllers.fetchPlans = async (req, res) => {
  try {
    const { agentId } = req.query;
    //console.log(agentId);

    const plans = await Plan.find({ agentId });
    ////console.log(plans);
    res.send(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ error: "An error occurred while fetching plans." });
  }
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
    image: req.image,
    agentId,
  };
  const plan = await Plan.create(newPlan);
  res.send({ msg: "Plan Added Successfully" });
};
module.exports = agentControllers;
