// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Profile = require('./models/profile');


// Connect to the oauth MongoDB
mongoose.connect('mongodb://localhost:27017/oauth');

// Create our Express application
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'Test Message' });
});

var profileRoute = router.route('/profile');

profileRoute.post(function(req, res) {
  // Create a new instance of the Profile model
  var profile = new Profile();

  // Set the properties from the POST data
  profile.name = req.body.name;
  profile.age = req.body.type;
	

  // Save the beer and check for errors
  profile.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Profile added successfully!', data: profile });
  });
 });
 
 profileRoute.get(function(req, res) {
  Profile.find(function(err,profiles){
	  if(err)
		  res.send(err);
	  res.json(profiles);
  });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert test on port ' + port);