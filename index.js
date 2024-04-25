const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
const bodyParser = require('body-parser');

connectToMongo();
const app = express()
const port =process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

// Available Routes
app.use('/', require('./routes/todo'));

app.listen(port, () => {
  console.log(`connection is created at port no.${port}`)
})