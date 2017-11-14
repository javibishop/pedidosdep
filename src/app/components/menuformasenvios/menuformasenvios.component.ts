import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormasEnvioService } from '../../services/formasenvio.service';

@Component({
  selector: 'app-menuformasenvios',
  templateUrl: './menuformasenvios.component.html',
  styleUrls: ['./menuformasenvios.component.css']
})
export class MenuformasenviosComponent implements OnInit {
  private _pedidosPorEnvio: any[];

  @Output() cambioMetodoEnvio: EventEmitter<any> = new EventEmitter();
  @Input() set pedidosPorEnvio(pedidosPorEnvio: any[]) {
    this._pedidosPorEnvio = pedidosPorEnvio;
    this.actualizarcontadores();
    }
    get pedidosPorEnvio(): any[] { return this._pedidosPorEnvio; }
  
    
  constructor(private formaenvioService: FormasEnvioService) { }

  formasenvio: any;
  idformaenvioactivo: number = 1;

  ngOnInit() {
    this.formasenvio = [];
    this.getFormasEnvio();
  }

  iralistadopedido(idformaenvio, color){
    this.idformaenvioactivo = idformaenvio;
    this.cambioMetodoEnvio.emit({id:idformaenvio, color: color}); 
  }

  setEstiloFormaEnvio(color) {
    return {
      'background-color': color, /* Add a green color to the "active/current" link */
      'color': 'black',
      'font-weight': 'bold'
    }
  }

  actualizarcontadores(){
    /* asigna la cantidad de pedidos por forma de envio para los estados 2,3,4 */
    if(this.pedidosPorEnvio && this.formasenvio){
      for (var i = 0, b = this.formasenvio.length; i < b; i++) {
        this.formasenvio[i].cantidad = 0;
        for (var x = 0, z = this.pedidosPorEnvio.length; x < z; x++) {
          if(this.pedidosPorEnvio[x]._id == this.formasenvio[i].id){
            this.formasenvio[i].cantidad = this.pedidosPorEnvio[x].total;
            break;
          }
        }  
      }
    }
  }

  getFormasEnvio(){
    this.formaenvioService.getFormasEnvio().map(response => response.json()).subscribe((result: any) => {
      this.formasenvio = result;
      this.actualizarcontadores();
    });
  }
}
