import { Component } from '@angular/core';
import { PedidosService} from './services/pedidos.service';
import { FormasEnvioService} from './services/formasenvio.service';
import { FormasPagosService} from './services/formaspagos.service';
import { EstadosService } from './services/estados.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PedidosService, FormasEnvioService, FormasPagosService, EstadosService]
})
export class AppComponent {
  title = 'Manejo de Pedidos ML';
}
