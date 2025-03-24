const mongoose = require('mongoose');

const TransferBookingSchema = new mongoose.Schema({
  userEmail: String,
  lastName: String,
  firstName: String,
  middleName: String,
  emailAddress: String,
  mobileNumber: Number,
  numberOfPersons: Number,
  startDate: Date,
  time: String,
  pickupLocation: String,
  dropOffLocation: String,
  remarks: String,
  serviceType: String,
});

module.exports = mongoose.model('TransferBooking', TransferBookingSchema);
