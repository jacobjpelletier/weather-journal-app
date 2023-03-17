// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

// server message 
function listening() {
    console.log(`Server running on localhost:${port}`);
    }

// GET route
// Add a GET route that returns the projectData object in your server code 
app.get('/all', function (req, res) {
    res.send(projectData);
    console.log*('GET');
  });

// POST route
// Add a POST route that adds incoming data to projectData
app.post('/', function (req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData);
    console.log('POST');
  });
