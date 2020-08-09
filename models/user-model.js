const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    thirdpartyid: String,
    thumbnail: String

});

const User = mongoose.model('myuser', userSchema);

module.exports = User;


