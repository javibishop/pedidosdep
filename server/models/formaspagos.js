var mongoose = require('mongoose');
var formaspagos = {
    "id" : Number,
    "nombre": String,
    "color" : String
}

var formaspagos = mongoose.model("Formaspagos", formaspagos);
module.exports = formaspagos;

