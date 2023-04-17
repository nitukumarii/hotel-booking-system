const asyncHandler = require("express-async-handler");

const {
  createBookingService,
  getAllTableService,
} = require("../services/bookingService");

// Request: POST
// Route: POST /api/v1/booking/submit
// Access: Public
const createBooking = asyncHandler(async (req, res) => {
  const { success, data } = await createBookingService(req.body);

  if (success) {
    return res.json({ success, data });
  }

  return res.status(500).json({ success: false, message: "Error" });
});

// Request: GET
// Route: GET /api/v1/bookings/getAll
// Access: Public
const getAllBookings = asyncHandler(async (req, res) => {
  const { success, data } = await getAllTableService();
  console.log(data)
  if (success) {
    return res.json({ success, data });
  }

  return res.status(500).json({ success: false, message: "Error" });
});
module.exports = {
  createBooking,
  getAllBookings,
};
