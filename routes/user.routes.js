const express = require("express");
const {
  userRegistration,
  userLogin,
} = require("../controllers/user.controllers");

const router = express.Router();

router.route("/register").post(userRegistration);
router.route("/login").post(userLogin);

module.exports = router;
