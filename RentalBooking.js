const mongoose = require('mongoose');

const RentalBookingSchema = new mongoose.Schema({
  userEmail: String,
  carName: String,
  lastName: String,
  firstName: String,
  middleName: String,
  emailAddress: String,
  mobileNumber: Number,
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
