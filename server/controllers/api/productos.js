var Productos = require('../../models/productos');

var productos = {
	getAll: function(req, res, next){
		Productos.find(function(err, data){
			if(err) console.error;
			
			res.json(data);
		});
	},
	read: function(req, res, next){
		
	},
	create: function(req, res, next){
		// Save the new model instance, passing a callback
		Productos.save(function (err) {
			if (err) return handleError(err);
			// saved!
		})
	},

	
	update: function(req, res, next){
		
	},
	delete: function(req, res, next){

	},

}

/*se exporta con el nombre productos y todas las funciones definidas*/
module.exports = productos;