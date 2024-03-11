const Flight = require("../models/flight.model");

const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    if (flights.length == 0) throw "No flights are recorded yet!";
    res.status(200).json({ flights_available: flights });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const addNewFlight = async (req, res) => {
  const {
    airline,
    flightNo,
    departure,
    arrival,
    departureTime,
    arrivalTime,
    seats,
    price,
  } = req.body;
  try {
    const flight = new Flight({
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    });
    await flight.save();
    res.status(201).json({ message: "New flight details has been recorded." });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getFlightById = async (req, res) => {
  const flightID = req.params.id;
  try {
    const flightFound = await Flight.findOne({ _id: flightID });
    if (!flightFound)
      throw `Flight with ID: ${flightID} was not found in the database.`;
    res.status(200).json({
      message: `Here are the flight details of flight with ID: ${flightID}`,
      flight_details: flightFound,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateFlightById = async (req, res) => {
  const flightID = req.params.id;
  const payload = req.body;
  try {
    await Flight.findByIdAndUpdate(flightID, payload);
    res.status(200).json({
      message: `Flight details of flight ID: ${flightID} has been udpated.`,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteFlightById = async (req, res) => {
  const flightID = req.params.id;
  try {
    await Flight.findByIdAndDelete(flightID);
    res.status(200).json({
      message: `Flight details of flight ID: ${flightID} has been deleted.`,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getAllFlights,
  addNewFlight,
  getFlightById,
  updateFlightById,
  deleteFlightById,
};
