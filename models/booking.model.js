const { mongoose, Schema } = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    flight: {
      type: Schema.Types.ObjectId,
      ref: "Flight",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
