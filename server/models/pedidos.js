export interface IPedido {
    id : Number,
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
    envioidmercadolibre:number,
    envioforma: String,
    enviodireccion : String,
    enviohora : String,
    enviolocalidad: String,
    envioprovincia: String,
    enviocp: String,
    envioacosto : Number,
    enviosucursal : String,
    envioadeuda : Number,
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
}

var pedido = mongoose.model("Pedidos", pedido);
module.exports = pedido;

