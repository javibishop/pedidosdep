import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { PedidosService} from './services/pedidos.service';
import { FormasEnvioService} from './services/formasenvio.service';
import { FormasPagosService} from './services/formaspagos.service';
import { EstadosService } from './services/estados.service';
import { AppGlobals } from "./app.global"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PedidosService, FormasEnvioService, FormasPagosService, EstadosService]
})
export class AppComponent implements OnInit{
  title = 'Manejo de Pedidos ML';
  constructor( private global: AppGlobals, private router:Router){
  }

  ngOnInit() {
    //if(this.router.url == "/") //ver si se puede detectar la raiz
    var token = this.getParameterByName('access_token', window.location.href); 
    if(token){
      this.global.token = token;
    }
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

