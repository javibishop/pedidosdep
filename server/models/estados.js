var mongoose = require('mongoose');
var estados = {
    "id" : Number,
    "nombre": String,
    "color" : String
}

var estados = mongoose.model("Estados", estados);
module.exports = estados;

