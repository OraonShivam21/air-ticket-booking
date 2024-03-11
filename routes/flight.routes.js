const express = require("express");
const {
  getAllFlights,
  addNewFlight,
  getFlightById,
  updateFlightById,
  deleteFlightById,
} = require("../controllers/flight.controllers");
const { auth } = require("../middlewares/auth.middlewares");

const router = express.Router();

router.route("/flights").get(getAllFlights).post(auth, addNewFlight);

router
  .route("/flights/:id")
  .get(getFlightById)
  .patch(auth, updateFlightById)
  .delete(auth, deleteFlightById);

module.exports = router;
