const express = require('express');
const connect = require('./connection/db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const SignUp = require('./SignUp')
const Login = require('./Login');
const Home = require('./Home')
const Events = require('./Events')
const deleteItems=require('./delete');
const GetEvents=require('./GetEvents');
const Edit=require('./Edit');
const app = express();
connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true
}));

const corsOptions = {
  origin: 'https://event-opal-mu.vercel.app',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
  allowedHeaders: 'Content-Type,Authorization',
  preflightContinue: false
};
app.use(cors(corsOptions));
app.options('*', (req, res) => {
  console.log(`Received OPTIONS request from origin: ${req.headers.origin}`);
  res.header('Access-Control-Allow-Origin', corsOptions.origin);
  res.header('Access-Control-Allow-Methods', corsOptions.methods);
  res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders);
  res.sendStatus(200); // Respond with a 200 status
});

app.use('/', Home);
app.use('/login', Login);
app.use('/signUp', SignUp);
app.use('/events', Events);
app.use('/getEvents',GetEvents);
app.use('/Edit',Edit);
app.use('/delete',deleteItems);
const PORT = process.env.PORT || 1234;
const HOST = '0.0.0.0'; // or specify a different host if necessary
app.listen(PORT,HOST, () => {
  console.log(`Server connected on ${PORT}`);
});