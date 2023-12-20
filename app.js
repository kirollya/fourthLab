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

var checkMeetings = null;

mongoose
    .connect(db)
    .then((res) => {
        console.log('App was connected to DB');
        checkMeetings = setInterval(() => {
            Meeting
                .find()
                .then((meetings) => {
                    console.log("check");
                    const now = new Date();
                    now.setMilliseconds(0);
                    now.setSeconds(0);
                    now.setTime(now.getTime() + 7200000);
                    for (var i = 0; i < meetings.length; i++) {
                        meetings[i].slot.setSeconds(0);
                        meetings[i].slot.setMilliseconds(0);
                        if (meetings[i].slot.getTime() == now.getTime()) {
                            console.log("Запись на " + meetings[i].slot.toString() + " у ");
                            User
                                .findById(meetings[i].userId)
                                .then((user) => {
                                    console.log(user.name);
                                });
                        }
                    }
                })
        }, 1000*60);
    })
    .catch((error) => {
        console.log(error);
    });

const server = express();
server.set('view engine', 'ejs');

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

server.listen(PORT, (error) => {
    error ? console.log(error) : console.log('successful start');
});

server.use(express.urlencoded({extended: false}));

server.get('/', (req, res) => {
    Doctor
        .find()
        .then((doctors) => {
            console.log
            res.render(createPath('index'), { doctors });
        })
});

server.get('/add_user', (req, res) => {
    res.render(createPath('add_user'));
})

server.post('/add_user', (req, res) => {
    const { phone, name } = req.body;
    const user = new User({phone, name});
    user
        .save()
        .then((result) => {
            res.render(createPath('index'));
        })
        .catch((error) => {
            console.log(error);
            res.send('<h1>Error</h1>');
        });
});

server.get('/add_meeting', (req, res) => {
    res.render(createPath('add_meeting'));
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
                res.render(createPath('index'));
            })
            .catch((error) => {
                console.log(error);
                res.send('<h1>Error</h1>');
            });
    });
    
});