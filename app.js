const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const LocalDateTime = require('@js-joda/core').LocalDateTime;
const Doctor = require('./models/doctor');
const User = require('./models/user');
const Meeting = require('./models/meeting');

const PORT = 8080;
const db = 'mongodb://localhost:27017/fourthLab';

mongoose
    .connect(db)
    .then((res) => {
        console.log('App was connected to DB');
    })
    .catch((error) => {
        console.log(error);
    });

const server = express();

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`)

server.listen(PORT, (error) => {
    error ? console.log(error) : console.log('successful start');
});

server.use(express.urlencoded({extended: false}));

server.get('/', (req, res) => {
    res.sendFile(createPath('index'));
});

server.get('/add_user', (req, res) => {
    res.sendFile(createPath('add_user'));
})

server.post('/add_user', (req, res) => {
    const { phone, name } = req.body;
    const user = new User({phone, name});
    user
        .save()
        .then((result) => {
            res.sendFile(createPath('index'));
        })
        .catch((error) => {
            console.log(error);
            res.send('<h1>Error</h1>');
        });
});

server.get('/add_meeting', (req, res) => {
    res.sendFile(createPath('add_meeting'));
});

server.post('/add_meeting', (req, res) => {
    const { docId, userId, slotNum } = req.body;
    var slot = null;
    const doctor = Doctor.findById(docId).then((doctor) => {
        const docSlot = doctor.slots[slotNum];
        slot = new Date(docSlot._date._year, docSlot._date._month-1, docSlot._date._day, docSlot._time._hour, docSlot._time._minute, docSlot._time._second);
        const meeting = new Meeting({docId, userId, slot});
        meeting
            .save()
            .then((result) => {
                res.sendFile(createPath('index'));
            })
            .catch((error) => {
                console.log(error);
                res.send('<h1>Error</h1>');
            });
    });
    
});