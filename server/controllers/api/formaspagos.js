var Formaspagos = require('../../models/formaspagos');
function mapear(fe){
	var formapago = new Formaspagos({
		id : fe.id,
		nombre: fe.nombre,
		color: fe.color
	});
	return formapago;
};
var formaspagos = {
	
	getAll: function(req, res, next){
		Formaspagos.find(function(err, data){
			if(err) console.error;
			console.log('forma pagos getall!')
			res.json(data);
		});
	},
	find: function(req, res, next){
		Formaspagos.find({'nombre': new RegExp(req.params.nombre, "i")},function(err, data){
			if(err) console.error;
			res.json(data);
		});
	},
	read: function(req, res, next){
		Formaspagos.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
	},
	create: function(req, res){
		var obj = mapear(req.body);
		obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
	},
	update: function(req, res, next){
		console.log('actualizar');
		Formaspagos.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
			if(err) return console.error(err);
			console.log('forma pagos actualizo!')
            res.sendStatus(200);
        })
	},
	delete: function(req, res, next){
		Formaspagos.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
	},
}

module.exports = formaspagos;


/*Ejemplo F:\Development\Angular\Angular2-Express-Mongoose-master\Angular2-Express-Mongoose-master\src\server.js */