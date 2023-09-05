const User = require("../modals/userSchema");
const Agent = require("../modals/agentSchema");
const Hotel = require("../modals/hotelSchema");
const Traveller = require("../modals/travelerSchema");
const Bus = require("../modals/buscompanySchema");
const jwt = require("jsonwebtoken");

const userControllers = {};

//agent signup
userControllers.Signup = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }
    const newUser = { email, password, type };
    const user = await User.create(newUser);
    const userId = user._id;
    const token = jwt.sign({ userId, type }, "Secret-Key", {
      expiresIn: "1h",
    });
    res.json({ token, type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign up user" });
  }
};

// Admin Signin
userControllers.Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "User with this email does not exist." });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const existingTypeUser = await getTypeUser(
      existingUser.id,
      existingUser.type
    ); // Helper function

    const typeIdtoken = jwt.sign(
      { typeId: existingTypeUser.id },
      "Secret-Key",
      {
        expiresIn: "1h",
      }
    );
    const token = jwt.sign({ id: existingUser.id }, "Secret-Key", {
      expiresIn: "1h",
    });
    res.json({ token, type: existingUser.type, typeIdtoken });
    //console.log("Login Successful", existingUser.type);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign in user" });
  }
};

async function getTypeUser(existingUserid, userType) {
  let typeModel;

  switch (userType) {
    case "traveller":
      typeModel = Traveller;
      break;
    case "agent":
      typeModel = Agent;
      break;
    case "hotel":
      typeModel = Hotel;
      break;
    case "bus":
      typeModel = Bus;
      break;
    default:
      throw new Error("Invalid user type");
  }

  return await typeModel.findOne({ userId: existingUserid });
}

module.exports = userControllers;
