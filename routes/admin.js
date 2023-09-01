const auth = require("../middlewares/auth");
const adminControllers = require("../controllers/adminControllers");
const { Router } = require("express");
const router = Router();

router.post("/signin", adminControllers.Signin);

module.exports = router;
