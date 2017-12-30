var Pedidos = require('../../models/pedidos');

function mapearPedidoInterfazAPedidoMongo(iPedido){
	var pedido = new Pedidos({
		id : iPedido.id,
		nombre: iPedido.nombre || iPedido.numerocliente,
		usuario: iPedido.usuario || iPedido.numerocliente,
		telefono: iPedido.telefono,
		mail: iPedido.mail,
		documento: iPedido.documento,
		envionumeroguia: iPedido.envionumeroguia,
		estado: iPedido.estado,
		formaentrega: iPedido.formaentrega,
		formapago: iPedido.formapago,
		estadoentrega: iPedido.estadoentrega,
		facturado : iPedido.facturado,
		numerocliente: iPedido.numerocliente,
		numerofactura: iPedido.numerofactura,
		numeropedido: iPedido.numeropedido,
		numerooc: iPedido.numerooc,
		comentario : iPedido.comentario,
		envioidmercadolibre: iPedido.envioidmercadolibre,
		envioforma : iPedido.envioforma,
		enviodireccion: iPedido.enviodireccion,
		enviosucursal: iPedido.enviosucursal,
		envioadeuda: iPedido.envioadeuda,
		enviolocalidad: iPedido.enviolocalidad,
		envioprovincia: iPedido.envioprovincia,
		enviobarrio: iPedido.enviobarrio,
		enviocp: iPedido.enviocp,
		enviobultos: iPedido.enviobultos,
		envioacosto : iPedido.envioacosto,
		enviohora: iPedido.enviohora,
		pagoforma : iPedido.pagoforma,
		pagoestado : iPedido.pagoestado,
		pagosolicitadinero : iPedido.pagosolicitadinero,
		pagosolicitadinerocobrado : iPedido.pagosolicitadinerocobrado,
		fechaalta:iPedido.fechaalta,
		fechapreparado:iPedido.fechapreparado,
		fechaentregado:iPedido.fechaentregado,
		fechafinalizado:iPedido.fechafinalizado,
		fechafacturado:iPedido.fechafacturado,
		fechaenviado:iPedido.fechaenviado,
		fecharecibido:iPedido.fecharecibido
	});
	return pedido;
};

var pedidos = {
	
	getAll: function(req, res, next){
		Pedidos.find(function(err, data){
			if(err) console.error;
			
			res.json(data);
		});
	},
	read: function(req, res, next){
		Pedidos.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
	},
	create: function(req, res){
		var obj = mapearPedidoInterfazAPedidoMongo(req.body);
		obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
	},
	update: function(req, res, next){
		console.log('actualizar');
		Pedidos.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
			if(err) return console.error(err);
			//console.log('actualizo!')
            res.sendStatus(200);
        })
	},
	delete: function(req, res, next){
		Pedidos.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.json({ estado: 'Ok', message: 'Pedido Eliminado!'});;
        });
	},
	
	getPedidosPorMetodoEnvio: function(req, res, next){
		Pedidos.find({ envioforma: req.params.envioforma }, function(err, data){
			if(err) console.error;
			res.json(data);
		});
	},

	getPedidosPaneles: function(req, res, next){
		Pedidos.find({'estado': { $in: [2,3,4] }},function(err, data){
			if(err) console.error;
			res.json(data);
		});
	},
	getPedidoPorEstado: function(req, res, next){
		if(req.query.estado == 0){
			Pedidos.find({'estado': { $in: [1,2,3,4,5] }},function(err, data){
				if(err) console.error;
				res.json(data);
			});
		}
		else{
			if(req.query.idformaenvio && req.query.idformaenvio > 0){
				Pedidos.find({ 'estado': req.query.estado, 'envioforma': req.query.idformaenvio},function(err, data){
					if(err) console.error;
					res.json(data);
				});
			}
			else
			{
				Pedidos.find({ 'estado': req.query.estado },function(err, data){
					if(err) console.error;
					res.json(data);
				});
			}
			
		}
	},

	getPendientes: function(req, res, next){
		Pedidos.find({ 'estado': '1' },function(err, data){
			if(err) console.error;
			res.json(data);
		});
	},
	getApreparar: function(req, res, next){
		Pedidos.find({ 'estado': '2' },function(err, data){
			if(err) console.error;
			res.json(data);
		});
	},
	getPreparados: function(req, res, next){
		Pedidos.find({ 'estado': '3' },function(err, data){
			if(err) console.error;
			res.json(data);
		});
	},
	getEntregados: function(req, res, next){
		Pedidos.find({ 'estado': '4' },function(err, data){
			if(err) console.error;
			res.json(data);
		});
	},
	getFinalizados: function(req, res, next){
		Pedidos.find({ 'estado': '5' },function(err, data){
			if(err) console.error;
			res.json(data);
		});
	},
	getPedidoPorIdML: function(req, res, next){
		console.log('getPedidoPorIdML');
		Pedidos.findOne({id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
	},

	getPedidoCountPorFormaEnvio: function(req, res, next){
		Pedidos.aggregate(
			{ 
				$match : {'estado': { $in: ['1','2','3','4'] }}
			},
			{ 
				$group : { 
					 _id : "$envioforma", 
					  total : { $sum : 1 } 
				}
			},function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
		})
	},

	getPedidoCountPorEstado: function(req, res, next){
		Pedidos.aggregate(
			// { 
			// 	$match : {'estado': { $in: ['1','2','3','4'] }}
			// },
			{ 
				$group : { 
					 _id : "$estado", 
					  total : { $sum : 1 } 
				}
			},function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
		})
	},

	getPedidoCountPorFormaEnvioChart: function(req, res, next){
		Pedidos.aggregate(
			// { 
			// 	$match : {'estado': { $in: ['1','2','3','4'] }}
			// },
			{ 
				$group : { 
					 _id : "$envioforma", 
					  total : { $sum : 1 } 
				}
			},function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
		})
	},
	find: function(req, res, next){
		var noesNumero = isNaN(req.params.valor);
		if(noesNumero){
			Pedidos.find({ $or:[ {'usuario': new RegExp(req.params.valor, "i")}, {'nombre':new RegExp(req.params.valor, "i")} ]}
			,function(err, data){
				if(err) console.error;
				res.json(data);
			});
		}
		else{
			Pedidos.find({id: req.params.valor}, function (err, obj) {
				if(err) return console.error(err);
				res.json(obj);
			})
		}
		
	},

	getIdsPedidosYaGrabado: function(req, res, next){
		var ids = [];
		for(let id of req.params.ids){
			ids.push(Number(id));
		}
		var idss = JSON.parse(req.params.ids).ids;
		Pedidos.find({'id': { $in: idss }},{ id: 1,_id: 0 },function(err, data){
			if(err) console.error;
			res.json(data);
		});
	},
}

module.exports = pedidos;


/*Ejemplo F:\Development\Angular\Angular2-Express-Mongoose-master\Angular2-Express-Mongoose-master\src\server.js */