const Agent = require("../modals/agentSchema");
const Hotel = require("../modals/hotelSchema");
const Traveler = require("../modals/travelerSchema");
const BusCompany = require("../modals/buscompanySchema");
const Admin = require("../modals/adminSchema");
const User = require("../modals/userSchema");
const jwt = require("jsonwebtoken");

const adminControllers = {};

// Admin Signin
adminControllers.Signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await User.findOne({ email });

    if (!existingAdmin) {
      return res
        .status(404)
        .json({ error: "Admin with this email does not exist." });
    }

    if (existingAdmin.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const token = jwt.sign({ id: existingAdmin.id }, "Secret-Key", {
      expiresIn: "1h",
    });
    res.json({ token });
    console.log("login Sucessful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign in admin" });
  }
};

// Controller to View Products:

module.exports = adminControllers;
