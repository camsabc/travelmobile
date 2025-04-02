const mongoose = require('mongoose');

const FlightBookingSchema = new mongoose.Schema({
  userEmail: String,
  lastname: String,
  firstname: String,
  middlename: String,
  emailAddress: String,
  contactNumber: Number,
  numberOfPersons: Number,
  paxList: [{
    paxNumber: Number,
    lastname: String,
    firstname: String,
    middlename: String,
    birthdate: Date,
    age: Number,
    category: { type: String, enum: ['Child', 'Adult', 'Senior'], required: true },
  },],
  startDate: Date,
  endDate: Date,
  airportDeparture: String,
  airportArrival: String,
  remarks: String,
  serviceType: String,
});

mongoose.model('FlightBooking', FlightBookingSchema);