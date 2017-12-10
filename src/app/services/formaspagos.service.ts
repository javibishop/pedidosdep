import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
//import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Document, Schema, Model, model} from "mongoose";
import { AppGlobals } from "../app.global"

import 'rxjs/add/operator/map';

@Injectable()
export class FormasPagosService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private global: AppGlobals) { }

  getFormasPagos(): Observable<Response> {  
    // Se declara cómo va a ser la llamada 
    // ocultando los pormenores a los consumidores   
    return this.http
      .get(this.global.serviceurl + 'api/formaspagos');
  }

  actualizar(formapago) {
    var newJson = JSON.parse(JSON.stringify(formapago));
    return this.http.put(this.global.serviceurl + 'api/formaspagos/' + newJson._id, newJson)
  }

  eliminar(_id){
      return this.http.delete(this.global.serviceurl + 'api/formaspagos/' + _id)
      .map((res:Response) => res.json());
  }
  grabar(formapago) {
    var newJson = JSON.parse(JSON.stringify(formapago));
    if(newJson._id){
      return this.actualizar(newJson);
    }
    else{
      return this.http.post(this.global.serviceurl + 'api/formaspagos', newJson)
      .map((res:Response) => res.json());
    }
  }
  buscar(nombre){
    return this.http
    .get(this.global.serviceurl + 'api/formaspagos/buscar/' + nombre);
  }
}
