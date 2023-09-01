const auth = require("../middlewares/auth");
const hotelControllers = require("../controllers/hotelControllers");
const { Router } = require("express");
const router = Router();
//hotel signup
router.post("/signup", hotelControllers.Signup);

module.exports = router;
