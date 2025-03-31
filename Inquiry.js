const mongoose = require('mongoose');

const InquirySchema = mongoose.Schema({
    email: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    },
    note: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

module.exports = Inquiry;
