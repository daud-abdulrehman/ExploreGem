// const Agent = require("../modals/agentSchema");
const Hotel = require("../modals/hotelSchema");
const Traveler = require("../modals/travelerSchema");
const Room = require("../modals/roomSchema");
// const BusCompany = require("../modals/buscompanySchema");
// const Admin = require("../modals/adminSchema");
// const User = require("../modals/userSchema");
const jwt = require("jsonwebtoken");

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

travelerControllers.Accommodation = async (req, res) => {
  try {
    const { destinationcity, staybudget, bedtype } = req.query;
    console.log(destinationcity, " ", staybudget, " ", bedtype);

    // Find hotels in the specified destination city
    const hotels = await Hotel.find({ location: destinationcity });
    console.log(hotels);

    // Find rooms in the specified hotels that match the bed type and stay budget
    let rooms = [];
    if (bedtype === "both") {
      for (const hotel of hotels) {
        const hotelRooms = await Room.find({
          hotelId: hotel._id,
          bedtype: { $in: ["single", "double"] },
          price: { $lte: staybudget },
        });
        rooms = [...rooms, ...hotelRooms];
      }
    } else {
      for (const hotel of hotels) {
        const hotelRooms = await Room.find({
          hotelId: hotel._id,
          bedtype: bedtype,
          price: { $lte: staybudget },
        });
        rooms = [...rooms, ...hotelRooms];
      }
    }

    // Send the matching rooms back to the client
    console.log(rooms);
    res.status(200).json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = travelerControllers;
