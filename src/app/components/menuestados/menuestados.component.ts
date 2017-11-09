import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EstadosService } from '../../services/estados.service';

@Component({
  selector: 'app-menuestados',
  templateUrl: './menuestados.component.html',
  styleUrls: ['./menuestados.component.css']
})
export class MenuestadosComponent implements OnInit {
  @Output() cambioEstado: EventEmitter<any> = new EventEmitter();
  @Input() estadoActual: 0;
  
  constructor(private estadosService: EstadosService) { }

  estados: any;
  idEstado: number = 0;

  ngOnInit() {
    this.estados = [];
    this.getEstados();
    if(this.estadoActual > 0){
      this.idEstado = this.estadoActual;
    }
  }

  pedidosPorEstado(idestado){
    this.idEstado = idestado;
    var estadoNombre = this.estados.filter(item => item.id == idestado)[0].nombre;
    this.cambioEstado.emit({idestado: idestado, nombre: estadoNombre}); 
  }

  getEstados(){
    this.estadosService.getEstados().map(response => response.json()).subscribe((result: any) => {
      this.estados = result;
    });
  }
}
