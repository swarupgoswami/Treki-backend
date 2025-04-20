const express = require("express");
const router = express.Router();
const { register, login ,userDetails } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/user", userDetails);


module.exports = router;
