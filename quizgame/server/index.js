const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var session = require('express-session');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.sessionMiddleware = session({
  secret : 'abcd',
  resave: true,
  saveUninitialized:true,
  cookie: {
    maxAge: null,
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