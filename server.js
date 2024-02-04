const favicon = require('serve-favicon');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
	service: 'mail',
	auth: {
		user: 'example@mail.com',
		pass: 'Password'
	}
});



mongoose.connect(process.env.MONGO_URI;, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to database successfully');
})
.catch((error) => {
    console.log('Error connecting to database:', error.message);
});

const Schema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phn: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeslot: {
        type: String,
        required: true
    },
    turf: {
        type: String,
        required: true
    },
    juices: {
        type: String,
        required: true
    }
});
const buser = mongoose.model('booked', Schema);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});
app.get('/facilities', (req, res) => {
    res.sendFile(__dirname + '/facilities.html');
});
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});
app.get('/gallery', (req, res) => {
    res.sendFile(__dirname + '/gallery.html');
});
app.get('/booknow', (req, res) => {
    res.sendFile(__dirname + '/book.html');
});

app.post('/booked', async (req,res)=>{
    const {name, email, phn, date, timeslot, turf,juices} = req.body;
    console.log({name, email, phn, date, timeslot, turf,juices});
    buser.create({name, email, phn, date, timeslot, turf,juices});
    text = 'Thanks for booking\nname: '+ name + '\nturf: '+turf +'\ndate: '+date + '\ntime slot: ' + timeslot + '\njuices: '+juices+'lts\nphone no:'+phn;
    //console.log(text);
    let mailDetails = {
        from: 'playzoneturf@outlook.com',
        to: email,
        subject: 'Playzone turf booked',
        text: text+''
    };
    
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
    
    res.sendFile(__dirname + '/booked.html');

    
});
app.use(favicon(__dirname + '/public/images/playzone-1.png'));
app.use(express.static('public'));
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
