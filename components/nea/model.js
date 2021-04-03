const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.Nea = mongoose.model('Nea', new Schema({
    fullName:{type: String},
    a:{type: String},
    e:{type: String},
    i:{type: String},
	om:{type: String},
	w:{type: String},
	ma:{type: String},
}));
