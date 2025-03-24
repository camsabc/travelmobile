const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const corsOptions = {
    origin: ["http://localhost:8081", "https://travelmobile.onrender.com"], // Allow specific domains
    credentials: true, // Allow cookies, Authorization headers, etc.
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


const generateToken = (booking) => {
    const secretKey = JWT_SECRET; // Use the same JWT secret key
    return jwt.sign({ bookingId: booking._id }, secretKey, { expiresIn: '1h' });
};
  
const handleError = (err, res) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
};

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: 'oliverostyron26@gmail.com', // Your email address
        pass: 'wbcc meui hqlt qfri' // Your email password or an app password
    }
});

// Remove this duplicate transporter creation
const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: 'oliverostyron26@gmail.com', // Ensure this matches the one used in transporter
        to,
        subject,
        html
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
};


app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect('mongodb+srv://travelwheels:travelwheels2024@travelwheels.4oost.mongodb.net/?retryWrites=true&w=majority&appName=travelwheels', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log("Database Connected");
}).catch((e) => {
    console.error('Database connection error:', e.message);
});

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

const User = require('./UserDetails');
const Booking = require('./Booking');


require('./FlightBooking'); // Ensure BookingDetails.js defines your Booking model
//const Booking = mongoose.model("FlightBooking");

require('./HotelBooking')
const HotelBooking = mongoose.model("HotelBooking");

require('./TransferBooking'); // Adjust the path as needed
const TransferBooking = mongoose.model('TransferBooking');

require('./RentalBooking'); // Ensure BookingDetails.js defines your Booking model
const RentalBooking = mongoose.model("RentalBooking");



/* This function creates a booking to be stored in the database */
app.post('/create-booking', async (req, res) => {
    const {
        firstname,
        middlename,
        lastname,
        email,
        contactNumber,
        startDate,
        endDate,
        pickupTime,
        pickupDate,
        dropoffTime,
        dropoffDate,
        pickupLocation,
        dropOffLocation,
        airportDeparture,
        airportArrival,
        preferredHotel,
        budgetRange,
        pickuploc,
        dropoffloc,
        companyname,
        contactperson,
        companyaddress,
        numOfPerson,
        vehicleName,
        remarks,
        status,
        gender,
        civilStatus,
        birthDate,
        countryBirth,
        provinceBirth,
        municipalityBirth,  
        firstnameFather,
        middlenameFather,
        lastnameFather,
        countryCitizenshipFather,
        firstnameMother,
        middlenameMother,
        lastnameMother,
        countryCitizenshipMother,
        firstnameSpouse,
        middlenameSpouse,
        lastnameSpouse,   
        applicationType, 
        oldPassportNumber,
        dateIssued,
        issuingAuthority,
        foreignPassportHolder,
        emergencyContactPerson,
        contactNumberForeign,
        passengers,
        province,
        city,
        occuputation,
        officeNumber,
        officeDetails,
        fullAddress,
        landmark,
        num,
        type,
        db
    } = req.body;

    /* Generates a random nine-digit number */
    const generateRandomNumber = () => Math.floor(100000000 + Math.random() * 900000000);

    const newBooking = new Booking({
        firstname,
        middlename,
        lastname,
        email,
        contactNumber,
        startDate,
        endDate,
        pickupLocation,
        dropOffLocation,
        pickupTime,
        pickupDate,
        dropoffTime,
        dropoffDate,
        airportDeparture,
        airportArrival,
        preferredHotel,
        budgetRange,
        pickuploc,
        dropoffloc,
        companyname,
        contactperson,
        companyaddress,
        numOfPerson,
        vehicleName,
        remarks,
        status,
        gender,
        civilStatus,
        birthDate,
        countryBirth,
        provinceBirth,
        municipalityBirth,  
        firstnameFather,
        middlenameFather,
        lastnameFather,
        countryCitizenshipFather,
        firstnameMother,
        middlenameMother,
        lastnameMother,
        countryCitizenshipMother,
        firstnameSpouse,
        middlenameSpouse,
        lastnameSpouse,   
        applicationType, 
        oldPassportNumber,
        dateIssued,
        issuingAuthority,
        foreignPassportHolder,
        emergencyContactPerson,
        contactNumberForeign,
        province,
        city,
        occuputation,
        officeNumber,
        officeDetails,
        fullAddress,
        landmark,
        num: generateRandomNumber(), 
        type,
        db: 'booking'
    });

    newBooking.save()
        .then(savedBooking => res.status(201).json(savedBooking))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to create booking' });
        });
});














const calculateAge = (birthdate) => {
    if (!birthdate) return null; // Handle case where birthdate is not provided
    const birthDate = new Date(birthdate);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate age
};


app.post('/bookings', async (req, res) => {
    try {
        const { userEmail, lastname, firstname, emailAddress, contactNumber, numberOfPersons, paxList, startDate, endDate, departureLocation, arrivalLocation, remarks, serviceType } = req.body;

        const formattedPaxList = paxList.map((pax, index) => {
            const age = calculateAge(pax.birthdate); // Calculate age first
            return {
                paxNumber: index + 1,
                lastname: pax.lastname,
                firstname: pax.firstname,
                birthdate: pax.birthdate,
                age: age,
                category: age < 12 ? 'Child' : (age >= 60 ? 'Senior' : 'Adult'), // Assign category based on calculated age
            };
        });

        const newBooking = new Booking({
            userEmail,
            lastname,
            firstname,
            emailAddress,
            contactNumber,
            numberOfPersons,
            paxList: formattedPaxList,
            startDate,
            endDate,
            departureLocation,
            arrivalLocation,
            remarks,
            serviceType
        });

        try {
            await newBooking.save();
            res.status(201).json({ status: "ok", data: newBooking });
        } catch (error) {
            console.error('Error saving booking:', error);
            return res.status(500).json({ error: 'Error saving booking' });
        }
    } catch (error) {
        console.error('Error while booking flight:', error);
        return res.status(500).json({ message: 'Error while booking flight', error: error.message });
    }
});




app.get('/bookings/:id', async (req, res) => {
    const bookingId = req.params.id;

    try {
        // First, try to find the booking in the FlightBooking collection
        let booking = await Booking.findById(bookingId);
        if (booking) {
            return res.status(200).json({ status: "ok", data: booking });
        }

        // If no booking found in any collection
        return res.status(404).json({ error: 'Booking not found' });
    } catch (error) {
        console.error('Error fetching booking details:', error);
        return res.status(500).json({ error: 'Failed to fetch booking details' });
    }
});


  
app.get('/bookings', async (req, res) => {
    try {
      const email = req.query.email;
      const bookings = await Booking.find({ email: email });
      res.status(200).json({ status: "ok", data: bookings });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ status: "error", message: "Failed to fetch bookings" });
    }
});


app.post('/userdata', async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.email;

        const userData = await User.findOne({ email: useremail });
        if (!userData) {
            return res.status(404).json({ status: "Error", message: "User  not found" });
        }

        // Fetch bookings and hotel bookings
        const bookings = await Booking.find({ email: useremail });
        
        // Return user data along with bookings
        return res.status(200).json({ 
            status: "Ok", 
            data: userData, 
            bookings: bookings,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ error: "Failed to fetch user data" });
    }
});























app.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    console.log('Forgot password request received for:', email);

    if (!email) {
        console.log('No email provided');
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(404).json({ error: 'No email exists' });
        }

        const firstname = user.firstname; // Ensure you have this field in your User schema

        // Generate a password reset token
        const resetToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        const resetLink = `https://travelmobile.onrender.com/reset-password?token=${resetToken}`;
        console.log('Reset link generated:', resetLink);

        const generatedOtp = Math.floor(100000 + Math.random() * 900000);
        otpStore[email] = { otp: generatedOtp, expiresAt: Date.now() + 5 * 60 * 1000 }; // Store OTP with expiration

        const htmlContent = `
        <p>Hi ${firstname},</p>
        <p>To reset your password, please use the following OTP code:</p>
        <h2 style="font-weight: bold; color: #000;">${generatedOtp}</h2>
        <p>This code is valid for 5 minutes.</p>
        <p>If you did not initiate this request, please disregard this email.</p>
        <p>Best regards,</p>
        <p>TravelWheels</p>
        `;

        // Wrap email sending in try-catch
        try {
            await sendEmail(email, 'Password Reset OTP', htmlContent);
            console.log('Reset OTP email sent successfully');
        } catch (emailError) {
            console.error('Error sending OTP email:', emailError);
            return res.status(500).json({ error: 'Failed to send OTP email' });
        }

        res.status(200).json({ message: 'Password reset OTP sent to your email' });
    } catch (error) {
        console.error('Error processing forgot password request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.get("/", (req, res) => {
    res.send({ status: "Started" });
});

let otpStore = {};
app.post('/signupmobile', async (req, res) => {
    const { firstname, lastname,bday, contactNumber, email, password, reEnterPassword } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ status: "error", data: "User already exists." });
        }

        if (password !== reEnterPassword) {
            return res.status(400).json({ status: "error", data: "Passwords do not match." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstname,
            lastname,
            bday,
            contactNumber,
            email,
            password: hashedPassword
        });

        console.log('User created successfully:', newUser);

        const generatedOtp = Math.floor(100000 + Math.random() * 900000);
        otpStore[email] = { otp: generatedOtp, expiresAt: Date.now() + 5 * 60 * 1000 }; // Ensure this line is correct

        const htmlContent = `
        <p>Hi ${firstname},</p>
        <p>Thank you for signing up with TravelWheels.</p>
        <p>Your OTP code for completing the sign-up process is:</p>
        <h2 style="font-weight: bold; color: #000;">${generatedOtp}</h2>
        <p>If you did not initiate this request, please disregard this email.</p>
        <p>Best regards,</p>
        <p>TravelWheels</p>
    `;
    

         // Send OTP email with HTML content
        await sendEmail(email, 'OTP for Sign Up', htmlContent);

        // Respond with success
        res.status(201).json({ status: "ok", data: "User Created", otp: generatedOtp });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.name === 'ValidationError') {
            // Handle validation errors specifically
            return res.status(400).json({ status: "error", data: error.message });
        }
        // General error handling
        res.status(500).json({ status: "error", data: error.message || "Error creating user. Please try again later." });
    }    
});



const isValidCode = (storedOtp, inputCode) => {
    return storedOtp && storedOtp.otp === parseInt(inputCode) && Date.now() < storedOtp.expiresAt;
};

  app.post('/verify-code', async (req, res) => {
    const { email, code } = req.body;
    const storedOtp = otpStore[email];

    console.log('Stored OTP:', storedOtp);
    console.log('Input Code:', code);

    if (isValidCode(storedOtp, code)) {
        delete otpStore[email]; // Remove OTP after successful verification
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});




app.post('/reset-password', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.post('/loginmobile', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for email:', email);

        const oldUser = await User.findOne({ email });

        console.log(oldUser);

        if (!oldUser) {
            console.log('User not found:', email);
            return res.status(400).json({ error: 'Email not found' });
        }

        const isMatch = await bcrypt.compare(password, oldUser.password);
        if (isMatch) {
            const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
            console.log('Login successful for email:', email);
            return res.status(200).json({
                success: true,
                data: token,
                type: oldUser.type,
            });
        } else {
            console.log('Incorrect password for email:', email);
            return res.status(400).json({ error: 'Wrong Password, Please try again.' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});
 
app.post('/checkemail', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(200).json({ exists: true });
        } else {
            res.status(404).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


// Function to send email using Nodemailer
app.post('/send-email', (req, res) => {
    const { to, text } = req.body;
    const mailOptions = {
        from: 'otp@gmail.com',
        to,
        subject:'OTP for Sign Up',
        text
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Email sending failed' });
        }
        res.status(200).json({ message: 'Email sent successfully' });
    });
});




app.post('/update-user', async (req, res) => {
    const { token, firstname, lastname, email, contactNumber, bday, newPassword, profileImage } = req.body;
  
    try {
        // Verify the token and get the user email
        const decoded = jwt.verify(token, JWT_SECRET); // Ensure JWT_SECRET is the correct secret key
        const userEmail = decoded.email; // Adjust based on how you encode the JWT payload

        // Find the user by email
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send('User not found');
        }
  
        // Update user fields
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (email) user.email = email;
        if (contactNumber) user.contactNumber = contactNumber;
        if (bday) user.bday = bday;
  
        if (newPassword) {
            user.password = await bcrypt.hash(newPassword, 10); // Use async hashing
        }
  
        if (profileImage) {
            user.profileImage = profileImage;
        }
  
        // Save updated user
        await user.save();
        res.status(200).send('User updated successfully');
    } catch (error) {
        console.error('Error updating user:', error.message); // Improved logging
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
});
  

app.get("/get-all-user", async (req, res) => {
    try {
        const data = await User.find({});
        res.status(200).json({ status: "Ok", data: data });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ error: error });
    }
});

app.post("/delete-account", async (req, res) => {
    const { email } = req.body;

    try {
        const deletedUser = await User.findOneAndDelete({ email });

        if (deletedUser) {
            return res.status(200).json({ status: "Ok", message: "Account deleted successfully" });
        } else {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }
    } catch (error) {
        console.error('Error deleting user account:', error);
        return res.status(500).json({ error: "Failed to delete account" });
    }
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Node.js server started on port ${PORT}.`);
});
