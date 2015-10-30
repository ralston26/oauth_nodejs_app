var mongoose = require('mongoose');
var ProfileSchema = new mongoose.Schema({
name: String,
age: Number
});
module.exports = mongoose.model('Profile',ProfileSchema);