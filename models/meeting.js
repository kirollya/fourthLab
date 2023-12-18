const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocalDateTime = require('@js-joda/core').LocalDateTime;

const meetingSchema = new Schema({
    docId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    slot: {
        type: Date,
        required: true
    }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;