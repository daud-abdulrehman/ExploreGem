const auth = require("../middlewares/auth");
const travelerControllers = require("../controllers/travelerControllers");
const { Router } = require("express");
const router = Router();
//traveler signup
router.post("/signup", travelerControllers.Signup);

module.exports = router;
