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
        LocalDateTime.now().plusHours(2).plusMinutes(1),
        LocalDateTime.now().plusHours(2).plusMinutes(2),
        LocalDateTime.now().plusHours(2).plusMinutes(3),
        LocalDateTime.now().plusHours(2).plusMinutes(4),
        LocalDateTime.now().plusHours(2).plusMinutes(5),
        LocalDateTime.now().plusHours(2).plusMinutes(6),
        LocalDateTime.now().plusHours(2).plusMinutes(7),
        LocalDateTime.now().plusHours(2).plusMinutes(8),
        LocalDateTime.now().plusHours(2).plusMinutes(9),
        LocalDateTime.now().plusHours(2).plusMinutes(10)
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