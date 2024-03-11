const Booking = require("../models/booking.model");
const Flight = require("../models/flight.model");

const bookingUserFlight = async (req, res) => {
  const userID = req.userID;
  const { flightID } = req.body;
  try {
    const booking = new Booking({ user: userID, flight: flightID });
    await booking.save();
    const flight = await Flight.findOne({ _id: flightID });
    res.status(201).json({
      message: `Your flight has been booked successfully!`,
      flight_details: flight,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllUserFlightDetails = async (req, res) => {
  const userID = req.userID;
  try {
    const bookings = await Booking.find({ user: userID });
    if (bookings.length == 0) throw "Book your first flight with us!";
    const booking_details = await Promise.all(
      bookings.map(async (booking) => {
        const flight_details = await Flight.findOne(booking.flight);
        return flight_details;
      })
    );
    res.status(200).json({ booking_details });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateUserFlightBooking = async (req, res) => {
  const flightID = req.params.id;
  const userID = req.userID;
  const payload = req.body;
  try {
    const bookingFound = await Booking.findOne({
      user: userID,
      flight: flightID,
    });
    if (!bookingFound)
      throw "You haven't booked for this flight! Please book your flight first!";

    await Booking.findByIdAndUpdate(bookingFound._id, payload);
    res.status(200).json({ message: "Booking has been updated successfully." });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteUserFlightBooking = async (req, res) => {
  const flightID = req.params.id;
  const userID = req.userID;
  try {
    const bookingFound = await Booking.findOne({
      user: userID,
      flight: flightID,
    });
    if (!bookingFound)
      throw "You haven't booked for this flight! Please book your flight first!";

    await Booking.findByIdAndDelete(bookingFound._id);
    res.status(200).json({ message: "Booking has been deleted successfully." });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  bookingUserFlight,
  getAllUserFlightDetails,
  updateUserFlightBooking,
  deleteUserFlightBooking,
};
