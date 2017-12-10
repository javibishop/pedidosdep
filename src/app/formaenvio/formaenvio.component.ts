import { Component, OnInit ,ElementRef, ViewChild, Renderer} from '@angular/core';
import {FormasEnvioService} from '../services/formasenvio.service';

@Component({
  selector: 'app-formaenvio',
  templateUrl: './formaenvio.component.html',
  styleUrls: ['./formaenvio.component.css']
})
export class FormaenvioComponent implements OnInit {
  @ViewChild('buttonModalEdit') buttonModalEdit:ElementRef;
  formasenvios: any;
  formaenvio: any;
  nombrebuscar: string;
  titulo: string;
  constructor(private formasEnvioService: FormasEnvioService, private renderer: Renderer) { }

  ngOnInit() {
    this.formaenvio = {};
    this.getFormasEnvio();
    this.nombrebuscar = '';
    this.titulo = '';
  }

  getFormasEnvio(){
    this.formasEnvioService.getFormasEnvio().map(response => response.json()).subscribe((result: any) => {
      this.formasenvios = result;
    });
  }
 
  editarFormaEnvio(id){
    let event = new MouseEvent('click', {bubbles: true});
    this.formaenvio = this.formasenvios.find(x => x._id == id);
    this.renderer.invokeElementMethod(this.buttonModalEdit.nativeElement, 'dispatchEvent', [event]);
  }

  eliminarFormaEnvio(_id){
    this.formasEnvioService.eliminar(_id)
    .subscribe(()=> {
      //this.toasterService.pop('success', 'Información', 'Se elimino el registro.');
      this.getFormasEnvio();
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
    })
  }
  
  grabarFormaEnvio(id){
    this.formasEnvioService.grabar(this.formaenvio).subscribe((result: any) => {
      this.formaenvio = {};
      this.getFormasEnvio();
    });
  }

  limpiarformaenvio(){
    this.formaenvio = {};
  }

  buscarFormaPago(){
    this.formasEnvioService.buscar(this.nombrebuscar).map(response => response.json()).subscribe((result: any) => {
      this.formasenvios = result;
    });
  }
}
