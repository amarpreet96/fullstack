const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser=require('body-parser');
const logger = require('morgon');
const Data = require('./data');

const PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

//mongodb setup
const dbRoute = '';
mongoose.connect(dbRoute, { useNewUrlParser: true});

let db = mongoose.connection;
//event based connection
db.once('open',()=>{console.log("connected")});
db.on('error',console.error.bind(console,'MongoDB connection error :'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

//https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274
