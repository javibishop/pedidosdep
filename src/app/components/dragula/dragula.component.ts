import { NgModel } from '@angular/forms'
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula'; 
import { IDragula } from './dragula.interface'
import { Dragula } from './dragula.class'
import { PedidosService } from '../../services/pedidos.service';
import {PrintcardComponent} from '../printcard/printcard.component'

@Component({
  selector: 'app-dragula',
  templateUrl: './dragula.component.html',
  styleUrls: ['./dragula.component.css'],
  providers: [DragulaService]
})
export class DragulaComponent implements OnInit {
  @Output() cambioEstadoEvento: EventEmitter<any> = new EventEmitter();
  @Output() finalizarPedidoEvento: EventEmitter<any> = new EventEmitter();
  @Output() modificarPedidoEvento: EventEmitter<any> = new EventEmitter();
  @Input() aPreparar: IDragula[];
  @Input() preparados: IDragula[];
  @Input() entregados: IDragula[];
  @Input() colorfondo: string;
  @ViewChild(PrintcardComponent) printcardComponent : PrintcardComponent;

  /*aca iria uno por columna */
  public d1 :  IDragula[] = [];
  public d2 :  IDragula[] = [];
  public d3 :  IDragula[] = [];
  pedidoId: 0;
  ngOnInit() { }
  constructor(private dragulaService: DragulaService, private pedidosService: PedidosService) {
    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    // el, target, source, sibling
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
      var idPedido = value[1].children[3].value;
      
      // var origenEstado = value[3].id;
      // var destinoEstado = value[2].id;
      
      var estadoDestino = 0;
      var origenEstado = 0;

      //Destino
      switch(value[2].id)
      {
        case 'aPreparar':
        estadoDestino = 2;
        break;
        case 'preparados':
        estadoDestino = 3;
        break;
        case 'entregados':
        estadoDestino = 4;
        break;
      }

      //Origen
      switch(value[3].id)
      {
        case 'aPreparar':
        origenEstado = 2;
        break;
        case 'preparados':
        origenEstado = 3;
        break;
        case 'entregados':
        origenEstado = 4;
        break;
      }
      this.cambioEstadoEvento.emit({id:idPedido, estadoDestino: estadoDestino, estadoOrigen:origenEstado}); 
    });
   
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });
  }

  alertStyles = {
    'color': 'red',
    'font-weight': 'bold'
  };

  setEstiloDiv(color) {
    return {
      'background-color': color
    }
  }
 
  solicitarDinero(pedidoId){
    this.pedidosService.solicitardinero(100).subscribe((result: any) => {
      var resultado = result.json();
      var initpoint = resultado.response.init_point;
    });;
  }

  imprimirPedido(pedidoId, idmercadoenvio){
    if(idmercadoenvio){
      window.open("https://myaccount.mercadolibre.com.ar/sales/shipments/printShipmentsLabels?ids=" + parseInt(idmercadoenvio) + "", "_blank");
    }
    else{
      this.printcardComponent.printPedido(pedidoId);
    }
  }

  updatePedido(id){
    this.modificarPedidoEvento.emit({id:id}); 
  }

  finPedidoEvento(id){
    this.finalizarPedidoEvento.emit({id:id}); 
  }
  

  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    let [e, el] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    let [e, el] = args;
    this.addClass(e, 'ex-moved');
  }

  private onOver(args) {
    let [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }
}