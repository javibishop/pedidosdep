var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// define the schema for our user model
var pedidoSchema = mongoose.Schema({
    id : { type: Number, required: true, unique: true },
    fecha : Date,
    nombre: String,
    usuario: String,
	telefono: String,
	mail: String,
	documento: String,
    estado: String,
	numerocliente: String,
    numerofactura: String,
    facturado: Boolean,
    numerooc: String,
	numeropedido: String,
    comentario : String,
    envioidmercadolibre: Number,
    enviolocalidad: String,
    envioprovincia: String,
    enviobarrio: String,
    enviocp: String,
    envioacosto : Number,
    envioforma: String,
    enviodireccion : String,
    enviohora : String,
    enviosucursal : String,
    envioadeuda : Number,
    enviobultos : Number,
    envionumeroguia: String,
    pagoforma: String,
    pagoestado: String,
    pagosolicitadinero: Number,
    pagosolicitadinerocobrado: Boolean,
    fechaalta:Date,
    fechapreparado:Date,
    fechaentregado:Date,
    fechafinalizado:Date,
    fechafacturado:Date,
    fechaenviado:Date,
    fecharecibido:Date
});

pedidoSchema.plugin(uniqueValidator, { message: 'Nro de pedido duplicado.' });

// pedidoSchema.pre('save', function(next) {
//     const user = this;
//     if (!user.isModified('password')) { return next(); }
//     bcrypt.genSalt(10, function(err, salt) {
//       if (err) { return next(err); }
//       user.password = user.generateHash(user.password, salt, function(error, hash) {
//         if (error) { return next(error); }
//         next();
//       });
//       next();
//     });
//   });

module.exports = mongoose.model('Pedidos', pedidoSchema);

// var pedido = {
//     id : Number,
//     fecha : Date,
//     nombre: String,
//     usuario: String,
// 	telefono: String,
// 	mail: String,
// 	documento: String,
//     estado: String,
// 	numerocliente: String,
//     numerofactura: String,
//     facturado: Boolean,
//     numerooc: String,
// 	numeropedido: String,
//     comentario : String,
//     envioidmercadolibre: Number,
//     enviolocalidad: String,
//     envioprovincia: String,
//     enviobarrio: String,
//     enviocp: String,
//     envioacosto : Number,
//     envioforma: String,
//     enviodireccion : String,
//     enviohora : String,
//     enviosucursal : String,
//     envioadeuda : Number,
//     enviobultos : Number,
//     envionumeroguia: String,
//     pagoforma: String,
//     pagoestado: String,
//     pagosolicitadinero: Number,
//     pagosolicitadinerocobrado: Boolean,
//     fechaalta:Date,
//     fechapreparado:Date,
//     fechaentregado:Date,
//     fechafinalizado:Date,
//     fechafacturado:Date,
//     fechaenviado:Date,
//     fecharecibido:Date
// }

// var pedido = mongoose.model(Pedidos, pedido);
// module.exports = pedido;

