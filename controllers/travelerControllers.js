// const Agent = require("../modals/agentSchema");
// const Hotel = require("../modals/hotelSchema");
const Traveler = require("../modals/travelerSchema");
// const BusCompany = require("../modals/buscompanySchema");
// const Admin = require("../modals/adminSchema");
// const User = require("../modals/userSchema");
//const jwt = require("jsonwebtoken");

const travelerControllers = {};

travelerControllers.Signup = async (req, res) => {
  const { username, contact, cnic, userId } = req.body;

  const newTraveler = { username, contact, cnic, userId };
  const createtraveler = await Traveler.create(newTraveler);
  const typeIdtoken = jwt.sign({ typeId: createtraveler._id }, "Secret-Key", {
    expiresIn: "1h",
  });
  res.json({ createtraveler, typeIdtoken });
};

module.exports = travelerControllers;
