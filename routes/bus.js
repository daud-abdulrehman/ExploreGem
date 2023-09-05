const auth = require("../middlewares/auth");
const busControllers = require("../controllers/busControllers");
const { Router } = require("express");
const router = Router();
//bus signup
router.post("/signup", busControllers.Signup);
router.post("/add-buses", busControllers.AddBuses);
router.get("/fetch-buses", busControllers.fetchBuses);

module.exports = router;
