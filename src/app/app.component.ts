import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { PedidosService} from './services/pedidos.service';
import { UsersService } from './services/users.service';
import { FormasEnvioService} from './services/formasenvio.service';
import { FormasPagosService} from './services/formaspagos.service';
import { EstadosService } from './services/estados.service';
import { AppGlobals } from "./app.global"
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PedidosService, FormasEnvioService, FormasPagosService, EstadosService,UsersService]
})
export class AppComponent implements OnInit{
  title = 'E-logistic';
  constructor( private global: AppGlobals, private router:Router, private http: Http){
  }

  ngOnInit() {
    //if(this.router.url == "/") //ver si se puede detectar la raiz
    var token = this.getParameterByName('access_token', window.location.href); 
    if(token){
      this.global.token = token;
    }

    //this.getcurf();
  }
  

  getcurf() {
    return this.http.get(this.global.serviceurl + 'api/getcurf')
    .map((res:Response) => res.json()).subscribe(data => {
      this.global.curf = data.csrfToken;
    });
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?#]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}

