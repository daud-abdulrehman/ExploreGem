const { Router } = require("express");
const router = Router();

const travelerRoutes = require("../routes/traveler");
const agentRoutes = require("../routes/agent");
const adminRoutes = require("../routes/admin");
const hotelRoutes = require("../routes/hotel");
const busRoutes = require("../routes/bus");
const userRoutes = require("../routes/user");

router.use("/admin", adminRoutes);
router.use("/traveler", travelerRoutes);
router.use("/agent", agentRoutes);
router.use("/hotel", hotelRoutes);
router.use("/bus", busRoutes);
router.use("/user", userRoutes);

module.exports = router;
