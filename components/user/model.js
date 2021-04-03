const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CONST = {
    ROLES:{
        ADMIN: 'ADMIN',
        CLIENT: 'CLIENT'
    }
}

exports.User = mongoose.model('User', new Schema({
    name:{type: String},
    pass:{type: String},
    email:{type: String},
    role:{type: String, default: CONST.ROLES.USER, enum: Object.values(CONST.ROLES) },
}));
