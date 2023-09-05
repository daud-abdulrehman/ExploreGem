const auth = require("../middlewares/auth");
const imagesaver = require("../middlewares/imageSaver");
const hotelControllers = require("../controllers/hotelControllers");
const { Router } = require("express");
const router = Router();
//hotel signup
router.post("/signup", hotelControllers.Signup);
router.get("/fetch-rooms", hotelControllers.fetchRooms);
router.post("/add-rooms", imagesaver, hotelControllers.AddRooms);
module.exports = router;
