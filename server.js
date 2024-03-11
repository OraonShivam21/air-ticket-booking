const express = require("express");
const connection = require("./connection");
const userRoute = require("./routes/user.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse json body
app.use(express.json());

// routes for booking, flight, and user
app.use("/api", userRoute);

app.get("/api", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome, this is the Air Ticket Booking API!" });
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to mongodb");
    console.log("listening on port", PORT);
  } catch (error) {
    console.log("there's some issue with connection");
    console.log(error);
  }
});
