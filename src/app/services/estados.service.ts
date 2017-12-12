import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Document, Schema, Model, model} from "mongoose";
import { AppGlobals } from "../app.global"
import 'rxjs/add/operator/map';

@Injectable()
export class EstadosService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private global: AppGlobals) { }

  getEstados(): Observable<Response> {  
    // Se declara cómo va a ser la llamada 
    // ocultando los pormenores a los consumidores   
    return this.http
      .get(this.global.serviceurl + 'api/estados');
  }

  actualizar(estado) {
    var newJson = JSON.parse(JSON.stringify(estado));
    return this.http.put(this.global.serviceurl + 'api/estados/' + newJson._id, newJson)
  }

  eliminar(_id){
      return this.http.delete(this.global.serviceurl + 'api/estados/' + _id)
      .map((res:Response) => res.json());
  }
  grabar(estado) {
    var newJson = JSON.parse(JSON.stringify(estado));
    if(newJson._id){
      return this.actualizar(newJson);
    }
    else{
      return this.http.post(this.global.serviceurl + 'api/estados', newJson)
      .map((res:Response) => res.json());
    }
  }

  buscar(nombre){
    return this.http
    .get(this.global.serviceurl + 'api/estados/buscar/' + nombre);
  }
}
