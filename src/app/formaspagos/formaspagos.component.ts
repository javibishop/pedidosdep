import { Component, OnInit ,ElementRef, ViewChild, Renderer } from '@angular/core';
import {FormasPagosService} from '../services/formaspagos.service';

@Component({
  selector: 'app-formaspagos',
  templateUrl: './formaspagos.component.html',
  styleUrls: ['./formaspagos.component.css']
})
export class FormaspagosComponent implements OnInit {

  constructor(private formasPagosService: FormasPagosService, private renderer: Renderer) {}
  @ViewChild('buttonModalEdit') buttonModalEdit:ElementRef;
  formapago: any;
  formaspagos: any;
  titulo: string;
  nombrebuscar: string;
  ngOnInit() {
    this.formapago = {};
    this.getFormasPago();
    this.titulo = 'Formas de Pago';
    this.nombrebuscar = '';
  }

  getFormasPago(){
    this.formasPagosService.getFormasPagos().map(response => response.json()).subscribe((result: any) => {
      this.formaspagos = result;
    });
  }
 
  editarFormaPago(id){
    let event = new MouseEvent('click', {bubbles: true});
    this.formapago = this.formaspagos.find(x => x._id == id);
    this.renderer.invokeElementMethod(this.buttonModalEdit.nativeElement, 'dispatchEvent', [event]);
  }

  eliminarFormaPago(_id){
    this.formasPagosService.eliminar(_id)
    .subscribe(()=> {
      //this.toasterService.pop('success', 'Información', 'Se elimino el registro.');
      this.getFormasPago();
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
    })
  }
  
  grabarFormaPago(id){
    this.formasPagosService.grabar(this.formapago).subscribe((result: any) => {
      this.formapago = {};
      this.getFormasPago();
    });
  }

  limpiarFormaPago(){
    this.formapago = {};
  }

  buscarFormaPago(){
    this.formasPagosService.buscar(this.nombrebuscar).map(response => response.json()).subscribe((result: any) => {
      this.formaspagos = result;
    });
  }
}
