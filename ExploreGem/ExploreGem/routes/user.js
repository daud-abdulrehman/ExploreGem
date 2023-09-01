const auth = require("../middlewares/auth");
const userControllers = require("../controllers/userControllers");
const { Router } = require("express");
const router = Router();
//user signup
router.post("/signup", userControllers.Signup);
//user signin
router.post("/signin", userControllers.Signin);
module.exports = router;
