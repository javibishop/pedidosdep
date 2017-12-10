import { Component, OnInit,EventEmitter,Renderer, ElementRef, Output, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PedidosService } from '../../services/pedidos.service';
import { FormasEnvioService } from '../../services/formasenvio.service';
import { FormasPagosService } from '../../services/formaspagos.service';
import { EstadosService } from '../../services/estados.service';
@Component({
  selector: 'app-pedidoeditor',
  templateUrl: './pedidoeditor.component.html',
  styleUrls: ['./pedidoeditor.component.css']
})
export class PedidoeditorComponent implements OnInit {
  private pedidoInfo: any;
  @Input() set pedidoAEditar(pedidoAEditar: any) {
    this.pedidoInfo = pedidoAEditar;
    }
    get pedidoAEditar(): any { return this.pedidoInfo; }

  @Output() gabroPedidoExito: EventEmitter<any> = new EventEmitter();
  @Output() gabroPedidoError: EventEmitter<any> = new EventEmitter();

  estados= [];
  formasdepago = [];
  formasenvios = [];
  
  constructor(private pedidosService: PedidosService, private route:ActivatedRoute, private renderer: Renderer, private formasEnvioService: FormasEnvioService,private formasPagosService: FormasPagosService,
    private estadosService: EstadosService,) {}
  ngOnInit() {
    this.getFormasEnvio();
    this.getFormasPagos();
    this.getEstados();
  }

  grabarPedido(){
    this.pedidosService.grabarPedido(this.pedidoInfo)
    .subscribe((data)=> {
      /*emitir evento para informar que grabo con exito*/
      this.gabroPedidoExito.emit(); 
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
      this.gabroPedidoError.emit(); 
    })
  }

  getFormasEnvio(){
    this.formasEnvioService.getFormasEnvio().map(response => response.json()).subscribe((result: any) => {
      this.formasenvios = result;
    });
  }
  
  getFormasPagos(){
    this.formasPagosService.getFormasPagos().map(response => response.json()).subscribe((result: any) => {
      this.formasdepago = result;
    });
  }

  getEstados(){
    this.estadosService.getEstados().map(response => response.json()).subscribe((result: any) => {
      this.estados = result;
    });
  }

  selectestado(valor){
    this.pedidoInfo.estado = valor;
  }
  selectenvioforma(valor){
    this.pedidoInfo.envioforma = valor;
  }
  selectpagoforma(valor){
    this.pedidoInfo.pagoforma = valor;
  }
}
