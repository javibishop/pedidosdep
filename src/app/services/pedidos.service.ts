import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { productos } from '../../server/models/productos';
import { Document, Schema, Model, model} from "mongoose";

//import  pedido from '../../server/models/pedidos.js';

import 'rxjs/add/operator/map';


@Injectable()
export class PedidosService {
  
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: Http) { }

 getUserInfo(user_id) {
    return this.http.get(`https://api.mercadolibre.com/users/`+ parseInt(user_id))
    .map((res:Response) => res.json());
  }

getProductoInfo(pedidoId) {
    return this.http.get(`https://api.mercadolibre.com/items/MLA`+ parseInt(pedidoId))
    .map((res:Response) => res.json());
  }
  
  getTokenInfo() {
    return this.http.get('https://auth.mercadolibre.com.ar/authorization?response_type=token&client_id=2434647748681214')
    .map((res:Response) => res.json());
  }

  actualizarPedido(pedido) {
    var newJson = JSON.parse(JSON.stringify(pedido));
    return this.http.put('http://localhost:3000/api/pedido/' + newJson._id, newJson)
  }

  eliminarPedido(_id){
      return this.http.delete('http://localhost:3000/api/pedido/' + _id)
      .map((res:Response) => res.json());
  }
  grabarPedido(pedido) {
    var newJson = JSON.parse(JSON.stringify(pedido));
    if(newJson._id){
      return this.actualizarPedido(newJson);
    }
    else{
      return this.http.post('http://localhost:3000/api/pedido', newJson)
      .map((res:Response) => res.json());
    }
  }

  getPedidoPorId(pedidoId: any) {
    return this.http.get('http://localhost:3000/api/pedido/' + pedidoId)
    .map((res:Response) => res.json());
  }

  getPedidoPorIdML(pedidoId) {
    return this.http.get('http://localhost:3000/api/pedidos/pedidoml/' + pedidoId)
    .map((res:Response) => res.json());
  }

  //cambiarEstado(pedidoId, estado)
  getPedidoInfo(orderId, token) {
    return this.http.get('https://api.mercadolibre.com/orders/' + parseInt(orderId) + '?access_token=' + token)
    .map((res:Response) => res.json());
  }

  getPedidoPorEstado(estado) {
    return this.http.get('http://localhost:3000/api/pedidos/estado/' + estado);
  }

  getPedidoPorEstadoyformaenvio(estado, idformaenvio) {
    var parametros = JSON.stringify({ estado: estado, idformaenvio: parseInt(idformaenvio)});
    return this.http.get('http://localhost:3000/api/pedidos/estadoyformaenvio?estado='+estado+'&idformaenvio=' + idformaenvio);
  }

  solicitardinero(monto) {
    var data = {'valor': monto};
   return this.http.post('http://localhost:3000/api/mercadolibre/solicitarpago',  data);

  // return this.http.get('http://localhost:3000/api/mercadolibre/accesstoken').map((res:Response) => {
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
    //return this.http.post('http://localhost:3000/api/mercadolibre/solicitarpago',  data);

  // getProductos() {
  //    this.http.get('http://localhost:3000/api/products').subscribe(data => {
  //     return data.json();
  //   }) 
  // }

  // las llamadas devuelven observables
getPedidos(): Observable<Response> {  
    // Se declara cómo va a ser la llamada 
    // ocultando los pormenores a los consumidores   
    return this.http
      .get('http://localhost:3000/api/pedidos');
    // En este momento aún no se efectuó la llamada
  }
 
      // las llamadas devuelven observables
  getPendientes(): Observable<Response> {  
    return this.http
      .get('http://localhost:3000/api/pedidos/pendiente');
  }

  getApreparar(): Observable<Response> {  
    return this.http
      .get('http://localhost:3000/api/pedidos/apreparar');
  }

  getPreparados(): Observable<Response> {  
    return this.http
      .get('http://localhost:3000/api/pedidos/preparado');
  }

  getEntregados(): Observable<Response> {  
    return this.http
      .get('http://localhost:3000/api/pedidos/entregado');
  }

  getFinalizados(): Observable<Response> {  
    return this.http
      .get('http://localhost:3000/api/pedidos/finalizado');
  }

  getPedidosPaneles(): Observable<Response> {  
    return this.http
      .get('http://localhost:3000/api/pedidos/paneles');
  }

  getPedidosPorEnvioForma(envioformaid): Observable<Response> {  
    return this.http
      .get('http://localhost:3000/api/pedidos/pedidoformaenvio/' + envioformaid);
  }

  getPedidoCountPorFormaEnvio(): Observable<Response> {  
    return this.http
      .get('http://localhost:3000/api/pedidos/pedidosporformaenviocount');
  }

  getPedidoCountPorFormaEnvioChart(): Observable<Response> {  
    return this.http
      .get('http://localhost:3000/api/pedidos/pedidosporformaenviocountchart');
  }

  sendmail(): Observable<Response> {  
    return this.http
      .get('http://localhost:3000/api/sendmail');
  }
  
}

 
