import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Document, Schema, Model, model} from "mongoose";
import { AppGlobals } from "../app.global"
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private global: AppGlobals) { }

  login(user, pass): Observable<Response> {  
    // Se declara cómo va a ser la llamada 
    // ocultando los pormenores a los consumidores   
    var data = {username:user, password:pass};
    return this.http
      .post(this.global.serviceurl + 'api/auth/login', JSON.parse(JSON.stringify(data)));
  }

  singup(user, pass): Observable<Response> {  
    // Se declara cómo va a ser la llamada 
    // ocultando los pormenores a los consumidores   
    var data = {username:user, password:pass};
    return this.http
      .post(this.global.serviceurl + 'api/user/singup', JSON.parse(JSON.stringify(data)));
  }
  
}
