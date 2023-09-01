const User = require("../modals/userSchema");
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
    const type = existingUser.type;
    const typeIdtoken = jwt.sign(
      { typeId: existingUser.userId },
      "Secret-Key",
      {
        expiresIn: "1h",
      }
    );
    const token = jwt.sign({ id: existingUser.id }, "Secret-Key", {
      expiresIn: "1h",
    });
    res.json({ token, type, typeIdtoken });
    console.log("login Sucessful", type);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign in user" });
  }
};

module.exports = userControllers;
