const mongoose = require('mongoose');

const HotelBookingSchema = new mongoose.Schema({
  userEmail: String,
  lastName: String,
  firstName: String,
  middleName: String,
  emailAddress: String,
  mobileNumber: Number,
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
