// const Agent = require("../modals/agentSchema");
const Hotel = require("../modals/hotelSchema");
const Traveler = require("../modals/travelerSchema");
const Room = require("../modals/roomSchema");
const Bus = require("../modals/busSchema");
const BusBooking = require("../modals/busbookingSchema");
//const BusCompany = require("../modals/buscompanySchema");
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
    //console.log(destinationcity, " ", staybudget, " ", bedtype);

    const hotels = await Hotel.find({ location: destinationcity });

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
    //console.log(rooms);
    res.status(200).json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

travelerControllers.Trip = async (req, res) => {
  try {
    const {
      departurecity,
      destinationcity,
      departuredate,
      returndate,
      nooftravelers,
      travelbudget,
    } = req.query;

    const departurecityTrimmed = departurecity.trim().toLowerCase();
    const destinationcityTrimmed = destinationcity.trim().toLowerCase();

    // Parse dates
    let departuredateISO = new Date(departuredate + "T00:00:00Z");
    let returndateISO = new Date(returndate + "T00:00:00Z");

    // Check if dates are valid
    if (isNaN(departuredateISO) || isNaN(returndateISO)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    let startDeparture = new Date(departuredateISO);
    let endDeparture = new Date(departuredateISO);
    endDeparture.setDate(endDeparture.getDate() + 1);

    let startReturn = new Date(returndateISO);
    let endReturn = new Date(returndateISO);
    endReturn.setDate(endReturn.getDate() + 1);
    const departureBuses = await Bus.find({
      departurecity: departurecityTrimmed,
      destinationcity: destinationcityTrimmed,
      departuredate: {
        $gte: startDeparture,
        $lt: endDeparture,
      },
      ticketprice: { $lte: travelbudget / 2 },
      $expr: {
        $gte: [
          { $subtract: ["$seats", "$bookedseats"] },
          Number(nooftravelers),
        ],
      },
    });

    const returnBuses = await Bus.find({
      departurecity: destinationcityTrimmed,
      destinationcity: departurecityTrimmed,
      departuredate: {
        $gte: startReturn,
        $lt: endReturn,
      },
      ticketprice: { $lte: travelbudget / 2 },
      $expr: {
        $gte: [
          { $subtract: ["$seats", "$bookedseats"] },
          Number(nooftravelers),
        ],
      },
    });

    res.json({ departureBuses, returnBuses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

travelerControllers.BookBus = async (req, res) => {
  const { travelerId, busId, noofseats } = req.body;
  const bus = await Bus.findByIdAndUpdate(
    busId,
    { $inc: { bookedseats: noofseats } },
    { new: true }
  );
  const newBooking = { noofseats, travelerId, busId };
  const createBooking = await BusBooking.create(newBooking);
  res.send("Booking Made");
};
module.exports = travelerControllers;
