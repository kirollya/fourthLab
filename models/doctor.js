const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const LocalDateTime = require('@js-joda/core').LocalDateTime;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    spec: {
        type: String,
        required: true
    },
    slots: {
        type: [],
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;