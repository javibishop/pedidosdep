var Estados = require('../../models/estados');

var estados = {
	
	getAll: function(req, res, next){
		Estados.find(function(err, data){
			if(err) console.error;
			console.log('forma pagos getall!')
			res.json(data);
		});
	},
	read: function(req, res, next){
		Estados.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
	},
	create: function(req, res){
		var obj = mapMLtopedido(req.body);
		obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
	},
	update: function(req, res, next){
		console.log('actualizar');
		Estados.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
			if(err) return console.error(err);
			console.log('forma pagos actualizo!')
            res.sendStatus(200);
        })
	},
	delete: function(req, res, next){
		Estados.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
	},
}

module.exports = estados;


/*Ejemplo F:\Development\Angular\Angular2-Express-Mongoose-master\Angular2-Express-Mongoose-master\src\server.js */