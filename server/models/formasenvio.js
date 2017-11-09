var mongoose = require('mongoose');
var formasenvio = {
    "id" : Number,
    "nombre": String,
    "color" : String
}

var formasenvio = mongoose.model("FormasEnvio", formasenvio);
module.exports = formasenvio;

