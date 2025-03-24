const mongoose = require('mongoose');

const FlightBookingSchema = new mongoose.Schema({
  userEmail: String,
  lastName: String,
  firstName: String,
  middleName: String,
  emailAddress: String,
  mobileNumber: Number,
  numberOfPersons: Number,
  paxList: [{
    paxNumber: Number,
    lastName: String,
    firstName: String,
    middleName: String,
    birthdate: Date,
    age: Number,
    category: { type: String, enum: ['Child', 'Adult', 'Senior'], required: true },
  },],
  startDate: Date,
  endDate: Date,
  departureLocation: String,
  arrivalLocation: String,
  remarks: String,
  serviceType: String,
});

mongoose.model('FlightBooking', FlightBookingSchema);