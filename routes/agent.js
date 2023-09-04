const auth = require("../middlewares/auth");
const imagesaver = require("../middlewares/imageSaver");
const agentControllers = require("../controllers/agentControllers");
const { Router } = require("express");
const router = Router();
//agent signup
router.post("/signup", agentControllers.Signup);
router.post("/add-plans", imagesaver, agentControllers.Addplans);
router.get("/fetch-plans", agentControllers.fetchPlans);

module.exports = router;
