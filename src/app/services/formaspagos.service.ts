import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Document, Schema, Model, model} from "mongoose";
import { AppGlobals } from "../app.global"

import 'rxjs/add/operator/map';

@Injectable()
export class FormasPagosService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: Http, private global: AppGlobals) { }

  getFormasPagos(): Observable<Response> {  
    // Se declara cómo va a ser la llamada 
    // ocultando los pormenores a los consumidores   
    return this.http
      .get(this.global.serviceurl + 'api/formaspagos');
  }
}
