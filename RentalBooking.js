const mongoose = require('mongoose');

const RentalBookingSchema = new mongoose.Schema({
  userEmail: String,
  carName: String,
  lastname: String,
  firstname: String,
  middlename: String,
  emailAddress: String,
  contactNumber: Number,
  numberOfPersons: Number,
  startDate: Date,
  startTime: Date,
  endDate: Date,
  endTime: Date,
  pickUpLocation: String,
  dropOffLocation: String,
  remarks: String,
  serviceType: String,
});

const RentalBooking = mongoose.model("RentalBooking", RentalBookingSchema);

module.exports = RentalBooking;
