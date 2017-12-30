import {IPedidoItemML} from './pedidomlitem.interface';

export interface IPedidoML {
    id : Number,
    fecha : Date,
    nombre: String,
    usuario: String,
	telefono: String,
	mail: String,
	documento: String,
    estado: String,
	seleccionado: Boolean,
    envioidmercadolibre:number,
    envioforma: String,
    enviodireccion : String,
    enviobarrio : String,
    enviohora : String,
    enviolocalidad: String,
    envioprovincia: String,
    enviocp: String,
    envioacosto : Number,
    enviosucursal : String,
    enviobultos: Number,
    pagoestado: String,
    items : IPedidoItemML []
}
