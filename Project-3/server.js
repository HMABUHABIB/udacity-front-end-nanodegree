// Setup empty JS object to act as endpoint for all routes
/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

const port = 5500;
const server = app.listen(port, listening);
function listening() {
 // console.log(server);
 console.log(`running on localhost: ${port}`);
};
// TODO-Spin up the server

app.get('/all', function (request, response) {
 response.send(projectData)
}
);


app.post('/addData', function (req, res) {
 console.log(req.body);
 projectData = {
  temperature: req.body.temperature,
  date: req.body.date,
  feelingsField: req.body.user_response
 }
 res.send()
 console.log(projectData)
});







