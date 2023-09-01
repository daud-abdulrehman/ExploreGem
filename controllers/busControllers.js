const Agent = require("../modals/agentSchema");
const Hotel = require("../modals/hotelSchema");
const Traveler = require("../modals/travelerSchema");
const BusCompany = require("../modals/buscompanySchema");
const Admin = require("../modals/adminSchema");
const User = require("../modals/userSchema");
const jwt = require("jsonwebtoken");

const busControllers = {};

//agent signup
busControllers.Signup = async (req, res) => {
  const { companyname, liscenceno, contact, userId } = req.body;

  const newBusCompany = { companyname, liscenceno, contact, userId };
  const buscompany = await BusCompany.create(newBusCompany);
  res.send({ msg: "BusCompany Signup Successful", buscompany });
};

module.exports = busControllers;
