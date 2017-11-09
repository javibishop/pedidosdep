var mongoose = require('mongoose');

var schema = {
	Id: Number,
	Nombre: String
}
var producto = mongoose.model("Productos", schema);
module.exports = producto