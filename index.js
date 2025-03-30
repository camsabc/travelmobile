// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 8081; // Choose any port you prefer

// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://${IP}:8081/travelwheelsdb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Define User Schema
// const userSchema = new mongoose.Schema({
//   firstname: String,
//   lastname: String,
//   email: String,
//   password: String,
// });

// const User = mongoose.model('User', userSchema);

// // Signup Endpoint
// app.post('/signup', async (req, res) => {
//   const { firstname, lastname, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     const newUser = new User({ firstname, lastname, email, password });
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Signup failed' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://${IP}:${port}`);
// });
