const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var session = require('express-session');
require('dotenv').config();
var MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

var store = new MongoDBStore({
  uri: process.env.ATLAS_URI,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24 * 30
});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.sessionMiddleware = session({
  secret : 'abcd',
  resave: false,
  saveUninitialized:false,
  store : store,
  cookie : {
    maxAge:null
  }
})
app.use(app.sessionMiddleware);




const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})







app.listen(port, () => {
    const adminRouter = require('./routes/admin');
    const gameRouter = require('./routes/game')
    app.use('/admin',adminRouter);
    app.use('/game',gameRouter);
});