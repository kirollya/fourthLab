const db = 'mongodb://localhost:27017/fourthLab';
const mongoose = require('mongoose');
const LocalDateTime = require('@js-joda/core').LocalDateTime;
const Doctor = require('./models/doctor');
const User = require('./models/user');

prefillDb();

async function prefillDb() {
    await mongoose
    .connect(db)
    .then((res) => {
        console.log('App was connected to DB');
    })
    .catch((error) => {
        console.log(error);
    });

    var name = 'Den';
    const spec = 'Therapist'
    const slots = [
        LocalDateTime.now().plusHours(0).plusMinutes(0),
        LocalDateTime.now().plusHours(1).plusMinutes(30),
        LocalDateTime.now().plusHours(3).plusMinutes(0),
        LocalDateTime.now().plusHours(4).plusMinutes(30),
        LocalDateTime.now().plusHours(6).plusMinutes(0),
        LocalDateTime.now().plusHours(7).plusMinutes(30),
        LocalDateTime.now().plusHours(9).plusMinutes(0),
        LocalDateTime.now().plusHours(10).plusMinutes(30),
        LocalDateTime.now().plusHours(12).plusMinutes(0),
        LocalDateTime.now().plusHours(13).plusMinutes(30)
    ];
        
    const doc = new Doctor({ name, spec, slots});
    await doc
        .save()
        .then((result) => {
            console.log('Doc was saved successfully');
        })
        .catch((error) => {
            console.log(error);
        });
        
    var phone = '89005002211';
    name = 'John';
    var user = new User({phone, name});
    await user
        .save()
        .then((result) => {
            console.log('User ' + name + ' was saved successfully');
        })
        .catch((error) => {
            console.log(error);
        });
    phone = '88005553535';
    name = 'Nick';
    user = new User({phone, name});
    await user
        .save()
        .then((result) => {
            console.log('User ' + name + ' was saved successfully');
        })
        .catch((error) => {
            console.log(error);
        });
    mongoose.disconnect();
}