import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EstadosService } from '../../services/estados.service';
import { PedidosService } from '../../services/pedidos.service' ;

@Component({
  selector: 'app-menuestados',
  templateUrl: './menuestados.component.html',
  styleUrls: ['./menuestados.component.css']
})
export class MenuestadosComponent implements OnInit {
  @Output() cambioEstado: EventEmitter<any> = new EventEmitter();
  @Input() estadoActual: 0;
  private _pedidosPorEstado: any[];
  @Input() set pedidosPorEstado(pedidosPorEstado: any[]) {
    this._pedidosPorEstado = pedidosPorEstado;
    this.actualizarcontadores();
    }
    get pedidosPorEstado(): any[] { return this._pedidosPorEstado; }
  
      
  constructor(private estadosService: EstadosService, private pedidosService: PedidosService) { }

  estados: any;
  pedidosPorEstados: any;
  idEstado: number = 0;

  ngOnInit() {
    this.estados = [];
    this.getEstados();
    if(this.estadoActual > 0){
      this.idEstado = this.estadoActual;
    }
  }

  getPedidosPorEstado(idestado){
    this.idEstado = idestado;
    var estadoNombre = this.estados.filter(item => item.id == idestado)[0].nombre;
    this.cambioEstado.emit({idestado: idestado, nombre: estadoNombre}); 
  }

  getEstados(){
    this.estadosService.getEstados().map(response => response.json()).subscribe((result: any) => {
      this.estados = result;
      this.actualizarcontadores();
    });
  }

    actualizarcontadores(){
      /* asigna la cantidad de pedidos por forma de envio para los estados 2,3,4 */
      if(this.pedidosPorEstado && this.estados){
        for (var i = 0, b = this.estados.length; i < b; i++) {
          this.estados[i].cantidad = 0;
          for (var x = 0, z = this.pedidosPorEstado.length; x < z; x++) {
            if(this.pedidosPorEstado[x]._id == this.estados[i].id){
              this.estados[i].cantidad = this.pedidosPorEstado[x].total;
              break;
            }
          }  
        }
      }
    }
  

  setEstiloFormaEnvio(color) {
    return {
      'background-color': color, /* Add a green color to the "active/current" link */
      'color': 'black',
      'font-weight': 'bold'
    }
  }
}
