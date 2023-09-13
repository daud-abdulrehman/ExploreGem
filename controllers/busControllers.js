const Agent = require("../modals/agentSchema");
const Hotel = require("../modals/hotelSchema");
const Traveler = require("../modals/travelerSchema");
const BusCompany = require("../modals/buscompanySchema");
const Admin = require("../modals/adminSchema");
const User = require("../modals/userSchema");
const Bus = require("../modals/busSchema");
const jwt = require("jsonwebtoken");

const busControllers = {};

//agent signup
busControllers.Signup = async (req, res) => {
  const { companyname, contact, liscenceno, userId } = req.body;

  const newBusCompany = { companyname, contact, liscenceno, userId };
  const buscompany = await BusCompany.create(newBusCompany);
  const typeIdtoken = jwt.sign({ typeId: buscompany._id }, "Secret-Key", {
    expiresIn: "1h",
  });
  res.json({ buscompany, typeIdtoken });
};

busControllers.AddBuses = async (req, res) => {
  const {
    lisceneplate,
    departurecity,
    destinationcity,
    seats,
    catagory,
    ticketprice,
    departuretime,
    departuredate,
    buscompanyId,
  } = req.body;

  const departurecityTrimmed = departurecity.trim().toLowerCase();
  const destinationcityTrimmed = destinationcity.trim().toLowerCase();

  const newBus = {
    lisceneplate: lisceneplate,
    departurecity: departurecityTrimmed,
    destinationcity: destinationcityTrimmed,
    seats: seats,
    catagory: catagory,
    ticketprice: ticketprice,
    departuretime: departuretime,
    departuredate: departuredate,
    buscompanyId: buscompanyId,
  };
  const bus = await Bus.create(newBus);
  res.send({ msg: "Bus added Successfully", bus });
};

busControllers.fetchBuses = async (req, res) => {
  try {
    const { buscompanyId } = req.query;
    //console.log(buscompanyId);

    const buses = await Bus.find({ buscompanyId });
    ////console.log(plans);
    res.send(buses);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ error: "An error occurred while fetching plans." });
  }
};

module.exports = busControllers;
