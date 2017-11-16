import { Component } from '@angular/core';
import { PedidosService} from './services/pedidos.service';
import { FormasEnvioService} from './services/formasenvio.service';
import { FormasPagosService} from './services/formaspagos.service';
import { EstadosService } from './services/estados.service';
import {ActivatedRoute} from '@angular/router';
import { AppGlobals } from "./app.global"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PedidosService, FormasEnvioService, FormasPagosService, EstadosService]
})
export class AppComponent {
  title = 'Manejo de Pedidos ML';
  constructor(private route:ActivatedRoute, private global: AppGlobals){
    this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.global.token = params['access_token'] || '';
      });
  }
}
