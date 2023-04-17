const express = require("express");
const route = express.Router();

const {
  getAllBookings,
  createBooking,
} = require("../controller/bookingController");


// Booking Submit API
route.post("/submit", createBooking);
// Get All Booking API
route.get("/getAll", getAllBookings);

module.exports = route;
