var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var symfonyLogShema = new Schema({
    log: { type: String }
});

module.exports = mongoose.model('SymfonyLog', symfonyLogShema);