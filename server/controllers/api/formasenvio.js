var FormasEnvio = require('../../models/formasenvio');

var formasenvio = {
	
	getAll: function(req, res, next){
		FormasEnvio.find(function(err, data){
			if(err) console.error;
			console.log('forma envio getall!')
			res.json(data);
		});
	},
	read: function(req, res, next){
		FormasEnvio.findOne({_id: req.params.id}, function (err, obj) {
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
		FormasEnvio.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
			if(err) return console.error(err);
			console.log('forma envio actualizo!')
            res.sendStatus(200);
        })
	},
	delete: function(req, res, next){
		FormasEnvio.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
	},
}

module.exports = formasenvio;


/*Ejemplo F:\Development\Angular\Angular2-Express-Mongoose-master\Angular2-Express-Mongoose-master\src\server.js */