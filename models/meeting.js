const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;