const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true // collection 에서 유일해야 함, id중복 x
    },
    job: {
        type: String,
        required: true,
    }
});

const userData = mongoose.model('users', user);
module.exports = userData;