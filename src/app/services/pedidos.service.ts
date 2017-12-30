import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Document, Schema, Model, model} from "mongoose";
import 'rxjs/add/operator/map';
import { AppGlobals } from "../app.global"

@Injectable()
export class PedidosService {
  
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private global: AppGlobals) { 
  }

 getUserInfo(user_id) {
    return this.http.get(`https://api.mercadolibre.com/users/`+ parseInt(user_id))
    .map((res:Response) => res.json());
  }

getProductoInfo(pedidoId) {
    return this.http.get(`https://api.mercadolibre.com/items/MLA`+ parseInt(pedidoId))
    .map((res:Response) => res.json());
  }
  /*https://api.mercadolibre.com/orders/search/recent?seller=172177242&access_token=APP_USR-6048120304954368-122413-22ab1c8a8a2f61f89c39c673dbb47d87__E_F__-172177242 */
getUltimasVentas() {
    return this.http.get('https://api.mercadolibre.com/orders/search/recent?seller='+this.global.idmercadolibre+'&access_token=' + this.global.token)
    .map((res:Response) => res.json().results);
  }
  
  getTokenInfo() {
    return this.http.get('https://auth.mercadolibre.com.ar/authorization?response_type=token&client_id=2434647748681214')
    .map((res:Response) => res.json());
  }

  actualizarPedido(pedido) {
    var newJson = JSON.parse(JSON.stringify(pedido));
    return this.http.put(this.global.serviceurl + 'api/pedido/' + newJson._id, newJson)
  }

  eliminarPedido(_id){
      return this.http.delete(this.global.serviceurl + 'api/pedido/' + _id)
      .map((res:Response) => res.json());
  }
  grabarPedido(pedido) {
    var newJson = JSON.parse(JSON.stringify(pedido));
    if(newJson._id){
      return this.actualizarPedido(newJson);
    }
    else{
      return this.http.post(this.global.serviceurl + 'api/pedido', newJson)
      .map((res:Response) => res.json());
    }
  }

grabarPedidos(pedidos) {
    for(let p of pedidos){
      var newJson = JSON.parse(JSON.stringify(p));
      return this.http.post(this.global.serviceurl + 'api/pedido', newJson)
      .map((res:Response) => res.json());
    }
  }
  getPedidoPorId(pedidoId: any) {
    return this.http.get(this.global.serviceurl + 'api/pedido/' + pedidoId)
    .map((res:Response) => res.json());
  }

  getPedidoPorIdML(pedidoId) {
    return this.http.get(this.global.serviceurl + 'api/pedidos/pedidoml/' + pedidoId)
    .map((res:Response) => res.json());
  }

/*De una lista de ids de pedido de ML verifica cuales ya estan grabados y devuelve una lista de esos ids ya grabados */
  getIdPedidoYaGrabado(idsMl) {
    return this.http.get(this.global.serviceurl + 'api/pedidos/verificaryagrabados/' + idsMl)
    .map((res:Response) => res.json());
  }
  //cambiarEstado(pedidoId, estado)
  getPedidoInfo(orderId, token) {
    return this.http.get('https://api.mercadolibre.com/orders/' + parseInt(orderId) + '?access_token=' + token)
    .map((res:Response) => res.json());
  }

  getPedidoPorEstado(estado) {
    return this.http.get(this.global.serviceurl + 'api/pedidos/estado/' + estado);
  }

  getPedidoPorEstadoyformaenvio(estado, idformaenvio) {
    var parametros = JSON.stringify({ estado: estado, idformaenvio: parseInt(idformaenvio)});
    return this.http.get(this.global.serviceurl + 'api/pedidos/estadoyformaenvio?estado='+estado+'&idformaenvio=' + idformaenvio);
  }

  solicitardinero(monto) {
    var data = {'valor': monto};
   return this.http.post(this.global.serviceurl + 'api/mercadolibre/solicitarpago',  data);

  // return this.http.get(this.global.serviceurl + 'api/mercadolibre/accesstoken').map((res:Response) => {
  //   return res.text();
  // });
}

  solicitardinero2(token){
    var data2 = {
      "currency_id" : "ARS",
      "payer_email" : "javibishop@gmail.com",
      "amount" : 2.1,
      "description" : "Description",
      "concept_type" : "off_platform"
    }
    return this.http.post('https://api.mercadopago.com/money_requests?access_token='+token, data2);
  }
  
    //return this.http.post('https://api.mercadopago.com/money_requests?access_token=TEST-2434647748681214-110414-37b7f84afd13191be6476a84d4266194__LA_LB__-103767', data2);
    //return this.http.post(this.global.serviceurl + 'api/mercadolibre/solicitarpago',  data);

  // getProductos() {
  //    this.http.get(this.global.serviceurl + 'api/products').subscribe(data => {
  //     return data.json();
  //   }) 
  // }

  // las llamadas devuelven observables
getPedidos(): Observable<Response> {  
    // Se declara cómo va a ser la llamada 
    // ocultando los pormenores a los consumidores   
    return this.http
      .get(this.global.serviceurl + 'api/pedidos');
    // En este momento aún no se efectuó la llamada
  }
 
      // las llamadas devuelven observables
  getPendientes(): Observable<Response> {  
    return this.http
      .get(this.global.serviceurl + 'api/pedidos/pendiente');
  }

  getApreparar(): Observable<Response> {  
    return this.http
      .get(this.global.serviceurl + 'api/pedidos/apreparar');
  }

  getPreparados(): Observable<Response> {  
    return this.http
      .get(this.global.serviceurl + 'api/pedidos/preparado');
  }

  getEntregados(): Observable<Response> {  
    return this.http
      .get(this.global.serviceurl + 'api/pedidos/entregado');
  }

  getFinalizados(): Observable<Response> {  
    return this.http
      .get(this.global.serviceurl + 'api/pedidos/finalizado');
  }

  getPedidosPaneles(): Observable<Response> {  
    return this.http
      .get(this.global.serviceurl + 'api/pedidos/paneles');
  }

  getPedidosPorEnvioForma(envioformaid): Observable<Response> {  
    return this.http
      .get(this.global.serviceurl + 'api/pedidos/pedidoformaenvio/' + envioformaid);
  }

  getPedidoCountPorFormaEnvio(): Observable<Response> {  
    return this.http
      .get(this.global.serviceurl + 'api/pedidos/pedidosporformaenviocount');
  }

  getPedidoCountPorEstado(): Observable<Response> {  
    return this.http
      .get(this.global.serviceurl + 'api/pedidos/pedidosporestadocount');
  }

  getPedidoCountPorFormaEnvioChart(): Observable<Response> {  
    return this.http
      .get(this.global.serviceurl + 'api/pedidos/pedidosporformaenviocountchart');
  }

  sendmail(datos): Observable<Response> {  
    return this.http
      .post(this.global.serviceurl + 'api/sendmail', JSON.parse(JSON.stringify(datos)));
  }
  //para en el post q el dato aparezca en el body, tienen que ir con JSON.parse(JSON.stringify(

  buscar(valor){
    return this.http
    .get(this.global.serviceurl + 'api/pedidos/buscar/' + valor);
  }
}

 
