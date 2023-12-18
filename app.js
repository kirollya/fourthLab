const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const LocalDateTime = require('@js-joda/core').LocalDateTime;
const Doctor = require('./models/doctor');
const User = require('./models/user');

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
            res.send('<h1>Error</h1>');
        });
});

server.post('/add_doc', (req, res) => {
    const name = 'Den';
    const spec = 'Therapist'
    const slots = [
        LocalDateTime.now().plusMinutes(1),
        LocalDateTime.now().plusMinutes(2)
    ];
    const doc = new Doctor({ name, spec, slots});
    doc
        .save()
        .then((result) => {
            console.log('Doc was saved successfully');
            res.sendFile(createPath('index'));
        })
        .catch((error) => {
            res.send('<h1>Error</h1>');
        });
});