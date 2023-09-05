//const Agent = require("../modals/agentSchema");
const Hotel = require("../modals/hotelSchema");
const Room = require("../modals/roomSchema");
// const Traveler = require("../modals/travelerSchema");
// const BusCompany = require("../modals/buscompanySchema");
// const Admin = require("../modals/adminSchema");
// const User = require("../modals/userSchema");
const jwt = require("jsonwebtoken");

const hotelControllers = {};

//agent signup
hotelControllers.Signup = async (req, res) => {
  const { hotelname, registrationno, contact, location, userId } = req.body;

  const newHotel = { hotelname, registrationno, contact, location, userId };
  const hotel = await Hotel.create(newHotel);
  const typeIdtoken = jwt.sign({ typeId: hotel._id }, "Secret-Key", {
    expiresIn: "1h",
  });
  res.json({ hotel, typeIdtoken });
};

hotelControllers.fetchRooms = async (req, res) => {
  try {
    const { hotelId } = req.query;

    const hotel = await Room.find({ hotelId });
    res.send(hotel);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ error: "An error occurred while fetching plans." });
  }
};

hotelControllers.AddRooms = async (req, res) => {
  const { description, bedtype, price, hotelId } = req.body;
  const newBus = {
    description,
    bedtype,
    price,
    hotelId,
    image: req.image,
  };
  const bus = await Room.create(newBus);
  res.send({ msg: "Plan Added Successfully" });
};

module.exports = hotelControllers;
