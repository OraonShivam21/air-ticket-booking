const express = require("express");
const {
  bookingUserFlight,
  getAllUserFlightDetails,
  updateUserFlightBooking,
  deleteUserFlightBooking,
} = require("../controllers/booking.controllers");
const { auth } = require("../middlewares/auth.middlewares");

const router = express.Router();

router.route("/booking").post(auth, bookingUserFlight);

router.route("/dashboard").get(auth, getAllUserFlightDetails);

router
  .route("/dashboard/:id")
  .patch(auth, updateUserFlightBooking)
  .delete(auth, deleteUserFlightBooking);

module.exports = router;
