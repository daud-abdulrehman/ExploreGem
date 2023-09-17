const auth = require("../middlewares/auth");
const travelerControllers = require("../controllers/travelerControllers");
const { Router } = require("express");
const router = Router();
//traveler signup
router.post("/signup", travelerControllers.Signup);
router.get("/accommodation/filter", travelerControllers.Accommodation);
router.get("/trip/filter", travelerControllers.Trip);
router.post("/book-bus", travelerControllers.BookBus);
module.exports = router;
