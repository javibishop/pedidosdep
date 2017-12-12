import { Component, OnInit ,ElementRef, ViewChild, Renderer } from '@angular/core';
import {EstadosService} from '../services/estados.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {

  constructor(private estadosService: EstadosService, private renderer: Renderer) {}
  @ViewChild('buttonModalEdit') buttonModalEdit:ElementRef;
  estado: any;
  estados: any;
  titulo: string;
  nombrebuscar: string;
  ngOnInit() {
    this.estado = {};
    this.getEstados();
    this.titulo = 'Estados';
    this.nombrebuscar = '';
  }

  getEstados(){
    this.estadosService.getEstados().map(response => response.json()).subscribe((result: any) => {
      this.estados = result;
    });
  }
 
  editarEstado(id){
    let event = new MouseEvent('click', {bubbles: true});
    this.estado = this.estados.find(x => x._id == id);
    this.renderer.invokeElementMethod(this.buttonModalEdit.nativeElement, 'dispatchEvent', [event]);
  }

  eliminarEstado(_id){
    this.estadosService.eliminar(_id)
    .subscribe(()=> {
      //this.toasterService.pop('success', 'Información', 'Se elimino el registro.');
      this.getEstados();
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
    })
  }
  
  grabarEstado(id){
    this.estadosService.grabar(this.estado).subscribe((result: any) => {
      this.estado = {};
      this.getEstados();
    });
  }

  limpiarEstado(){
    this.estado = {};
  }

  buscarFormaPago(){
    this.estadosService.buscar(this.nombrebuscar).map(response => response.json()).subscribe((result: any) => {
      this.estados = result;
    });
  }
}
