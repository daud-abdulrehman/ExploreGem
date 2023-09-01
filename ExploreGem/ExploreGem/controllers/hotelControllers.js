const Agent = require("../modals/agentSchema");
const Hotel = require("../modals/hotelSchema");
const Traveler = require("../modals/travelerSchema");
const BusCompany = require("../modals/buscompanySchema");
const Admin = require("../modals/adminSchema");
const User = require("../modals/userSchema");
const jwt = require("jsonwebtoken");

const hotelControllers = {};

//agent signup
hotelControllers.Signup = async (req, res) => {
  const { hotelname, registrationno, contact, location, userId } = req.body;

  const newHotel = { hotelname, registrationno, contact, location, userId };
  const hotel = await Hotel.create(newHotel);
  res.send({ msg: "Hotel Signup Successful", hotel });
};

module.exports = hotelControllers;
