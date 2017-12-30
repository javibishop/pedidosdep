import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {IPedido} from '../../../server/models/pedido.interface';
import {IPedidoML} from '../../../server/models/pedidoml.interface';
import {IPedidoItemML} from '../../../server/models/pedidomlitem.interface';
import { AppGlobals } from "../app.global"

@Injectable()
export class PedidoHelper {
   constructor(private global:AppGlobals) {

   }

   /*Crea un IPedido vacio */
  createPedido() : IPedido{
    let pedido2 = {} as IPedido;
    pedido2.id = 0,
    pedido2.nombre= '',
    pedido2.usuario= '',
    pedido2.telefono= '',
    pedido2.mail = '',
    pedido2.documento= '',
    pedido2.envionumeroguia = '',
    pedido2.estado= this.global.idestadodefault,
    pedido2.facturado = false,
    pedido2.numerocliente= '',
    pedido2.numerofactura= '',
    pedido2.numeropedido= '',
    pedido2.numerooc= '',
    pedido2.comentario= '',
    pedido2.envioidmercadolibre = 0;
    pedido2.envioforma= this.global.idformaenviodefault,
    pedido2.enviolocalidad = '',
    pedido2.envioprovincia= '',
    pedido2.enviocp= '',
    pedido2.enviobarrio= '',
    pedido2.envioacosto = 0,
    pedido2.enviodireccion=  '',
    pedido2.enviosucursal= '',
    pedido2.envioadeuda= 0,
    pedido2.enviobultos=0,
    pedido2.pagoforma = this.global.idformapagodefault,
    pedido2.pagoestado = '',
    pedido2.pagosolicitadinero = 0,
    pedido2.pagosolicitadinerocobrado= false,
    pedido2.fechaalta = new Date(),
		pedido2.fechapreparado= null,
		pedido2.fechaentregado= null,
		pedido2.fechafinalizado= null,
		pedido2.fechafacturado= null,
		pedido2.fechaenviado= null,
		pedido2.fecharecibido= null 
    return pedido2;
  };

  mapPedidoMLibreToIPedido(body) : IPedido{
    let pedido2 = {} as IPedido;
    if(body.shipping && body.shipping.shipping_mode && body.shipping.shipping_mode === 'me2'){
      pedido2.envioidmercadolibre = body.shipping.id;
    }
  
    pedido2.id = body.id,
    pedido2.nombre= body.buyer.first_name + ' ' + body.buyer.last_name,
    pedido2.usuario= body.buyer.nickname,
    pedido2.telefono= (body.buyer.phone.area_code || '') + '-' +body.buyer.phone.number,
    pedido2.mail= body.buyer.email,
    pedido2.documento= body.buyer.billing_info.doc_type + '-' + body.buyer.billing_info.doc_number,
    pedido2.envionumeroguia = '',
    pedido2.estado= body.estado,
    pedido2.facturado= false,
    pedido2.numerocliente= body.numerocliente,
    pedido2.numerofactura= body.numerofactura,
    pedido2.numeropedido= body.numeropedido,
    pedido2.numerooc= body.numerooc,
    pedido2.comentario= body.comentario,
    pedido2.envioforma= body.envioforma,
    pedido2.enviodireccion= body.shipping.receiver_address ? (body.shipping.receiver_address.address_line ? body.shipping.receiver_address.address_line : '') : '',
    pedido2.enviosucursal= '',
    pedido2.envioadeuda= body.envioadeuda,
    pedido2.enviobultos=1,
    pedido2.enviobarrio = body.enviobarrio,
    pedido2.enviocp = body.enviocp,
    pedido2.pagoforma= body.pagoforma,
    pedido2.enviolocalidad = body.shipping.receiver_address ? (body.shipping.receiver_address.city ? body.shipping.receiver_address.city.name : '') : '',
    pedido2.envioprovincia = body.shipping.receiver_address ? (body.shipping.receiver_address.state ? body.shipping.receiver_address.state.name : '') : '',
    pedido2.enviocp = body.shipping.receiver_address ? (body.shipping.receiver_address.zip_code ? body.shipping.receiver_address.zip_code : '') : '',
    pedido2.envioacosto = body.shipping.shipping_option ? (body.shipping.shipping_option.cost ? body.shipping.shipping_option.cost : 0) : 0,
    pedido2.pagoestado= '',
    pedido2.pagosolicitadinero = 0,
    pedido2.pagosolicitadinerocobrado = false 
    pedido2.fechaalta = null,
    pedido2.fechapreparado= null,
    pedido2.fechaentregado= null,
    pedido2.fechafinalizado= null,
    pedido2.fechafacturado= null,
    pedido2.fechaenviado= null,
    pedido2.fecharecibido= null
    return pedido2;
  };

  /*Mapea el pedido intermedio al pedido de bd listo para grabar. */
  mapIPedidoMLToIPedido(iPedidoML) : IPedido{
    let pedido = {} as IPedido;
   
    pedido.id = iPedidoML.id;
    pedido.envioidmercadolibre = iPedidoML.envioidmercadolibre;
    pedido.nombre = iPedidoML.nombre;
    pedido.usuario = iPedidoML.usuario;
    pedido.telefono = iPedidoML.telefono;
    pedido.mail = iPedidoML.mail;
    pedido.documento = iPedidoML.documento;
    pedido.envionumeroguia = '';
    pedido.estado= iPedidoML.estado;
    pedido.facturado = false;
    pedido.numerocliente = '';
    pedido.numerofactura = '';
    pedido.numeropedido = '';
    pedido.numerooc = '';
    pedido.comentario = '';
    pedido.envioforma = iPedidoML.envioforma;
    pedido.enviodireccion = iPedidoML.enviodireccion;
    pedido.enviosucursal= '';
    pedido.envioadeuda = 0;
    pedido.enviobultos = iPedidoML.enviobultos;
    pedido.enviobarrio = iPedidoML.enviobarrio;
    pedido.enviocp = iPedidoML.enviocp;
    pedido.pagoforma = '1';
    pedido.enviolocalidad = iPedidoML.enviolocalidad;
    pedido.envioprovincia = iPedidoML.envioprovincia;
    pedido.envioacosto = iPedidoML.envioacosto;
    pedido.pagoestado = iPedidoML.pagoestado;
    pedido.pagosolicitadinero = 0;
    pedido.pagosolicitadinerocobrado = false 
    pedido.fechaalta = iPedidoML.fecha;
    pedido.fechapreparado = null;
    pedido.fechaentregado = null;
    pedido.fechafinalizado = null;
    pedido.fechafacturado = null;
    pedido.fechaenviado = null;
    pedido.fecharecibido = null;
    return pedido;
  };

  /*Mapea el pedido de mercado libre a un pedido intermedio para mostrar en la grilla. */
  mapPedidoMLibreToIPedidoMl(body) : IPedidoML{
    let pedido2 = {} as IPedidoML;
    if(body.shipping && body.shipping.shipping_mode && body.shipping.shipping_mode === 'me2'){
      pedido2.envioidmercadolibre = body.shipping.id;
    }
  
    pedido2.id = body.id;
    pedido2.nombre= body.buyer.first_name + ' ' + body.buyer.last_name;
    pedido2.usuario= body.buyer.nickname;
    pedido2.telefono= (body.buyer.phone.area_code || '') + '-' +body.buyer.phone.number;
    pedido2.mail= body.buyer.email;
    pedido2.documento= body.buyer.billing_info.doc_type + '-' + body.buyer.billing_info.doc_number;
    pedido2.estado= body.estado;
    pedido2.envioforma= body.envioforma;
    pedido2.enviodireccion= body.shipping.receiver_address ? (body.shipping.receiver_address.address_line ? body.shipping.receiver_address.address_line : '') : '';
    pedido2.enviosucursal= '';
    pedido2.enviobarrio = body.enviobarrio;
    pedido2.enviocp = body.enviocp;
    pedido2.enviolocalidad = body.shipping.receiver_address ? (body.shipping.receiver_address.city ? body.shipping.receiver_address.city.name : '') : '';
    pedido2.envioprovincia = body.shipping.receiver_address ? (body.shipping.receiver_address.state ? body.shipping.receiver_address.state.name : '') : '';
    pedido2.enviocp = body.shipping.receiver_address ? (body.shipping.receiver_address.zip_code ? body.shipping.receiver_address.zip_code : '') : '';
    pedido2.envioacosto = body.shipping.shipping_option ? (body.shipping.shipping_option.cost ? body.shipping.shipping_option.cost : 0) : 0;
    pedido2.pagoestado= '';
    pedido2.fecha = body.date_created;
    pedido2.items = this.mapItems(body.order_items);
    pedido2.enviobultos = pedido2.items.length;
    pedido2.seleccionado = false;
    return pedido2;
  };

  mapItems(itemsMl) : any {
    let itemsMapeados  = [] as IPedidoItemML[];
    let item = {} as IPedidoItemML;

    for(let itemml of itemsMl){
      item.cantidad = itemml.quantity;
      item.iditem = itemml.item.id;
      item.nombre = itemml.item.title;
      item.precio = itemml.full_unit_price;

      itemsMapeados.push(item);
    }
    return itemsMapeados;
  }
}