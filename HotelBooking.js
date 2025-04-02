const mongoose = require('mongoose');

const HotelBookingSchema = new mongoose.Schema({
  userEmail: String,
  lastname: String,
  firstname: String,
  middlename: String,
  emailAddress: String,
  contactNumber: Number,
  numberOfPersons: Number,
  roomType: String,
  startDate: Date,
  endDate: Date,
  preferredHotel: String,
  budgetRange: Number,
  remarks: String,
  serviceType: String,
});

const HotelBooking = mongoose.model("HotelBooking", HotelBookingSchema);

module.exports = HotelBooking;
