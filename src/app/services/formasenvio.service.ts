import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { productos } from '../../server/models/productos';
import { Document, Schema, Model, model} from "mongoose";

//import  pedido from '../../server/models/pedidos.js';

import 'rxjs/add/operator/map';

@Injectable()
export class FormasEnvioService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: Http) { }

  getFormasEnvio(): Observable<Response> {  
    // Se declara cómo va a ser la llamada 
    // ocultando los pormenores a los consumidores   
    return this.http
      .get('http://localhost:3000/api/formasenvio');
  }
}
