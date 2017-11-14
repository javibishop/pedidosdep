import { Component, OnInit,EventEmitter,Renderer, ElementRef, ViewChild } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';
import {ActivatedRoute} from '@angular/router';
import {PrintcardComponent} from '../components/printcard/printcard.component'
import { FormasEnvioService } from '../services/formasenvio.service';
import { FormasPagosService } from '../services/formaspagos.service';
import { EstadosService } from '../services/estados.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-pedidoslista',
  templateUrl: './pedidoslista.component.html',
  styleUrls: ['./pedidoslista.component.css']
})
export class PedidoslistaComponent implements OnInit {
  @ViewChild('buttonModalEnviar') buttonModalEnviar:ElementRef;
  @ViewChild('buttonModalEnviarCancel') buttonModalEnviarCancel:ElementRef;
  @ViewChild('buttonModalEdit') buttonModalEdit:ElementRef;
  @ViewChild('buttonModalCancel') buttonModalCancel:ElementRef;
  @ViewChild('buttonModalFacturar') buttonModalFacturar:ElementRef;
  @ViewChild('buttonModalFacturarCancel') buttonModalFacturarCancel:ElementRef;
  @ViewChild(PrintcardComponent) printcardComponent : PrintcardComponent;

  pedidos = [];
  estado = 0;
  pedidoInfo : any;
  estados= [];
  formapago= [];
  formasenvios = [];
  nrofactura : string;
  envionumeroguia : string;
  estadoNombre: string;
  comentario: string;
  idformaenvio: 0;
  token = "APP_USR-6048120304954368-100811-2c7f133a8d06431b3b8c6b621634828b__K_A__-172177242";

  constructor(private pedidosService: PedidosService, private route:ActivatedRoute, private renderer: Renderer, private formasEnvioService: FormasEnvioService,private formasPagosService: FormasPagosService,
    private estadosService: EstadosService, private toasterService: ToasterService) { 
  }

  ngOnInit() {
    this.pedidos = [];
    this.pedidoInfo = {};
    this.route.queryParams.subscribe(params => {
    // Defaults to 0 if no query param provided.
    this.estado = params['estado'] || 0;
    this.idformaenvio = params['idformaenvio'] || 0;
    });
    
    this.comentario = '';
    this.nrofactura = '';
    this.envionumeroguia = '';
    
    this.estado = Number(this.estado);
    this.estadoNombre ='en todos los Estados';
    this.getFormasEnvio();
    this.getFormasPagos();
    this.getEstados();
    this.getPedidos({idestado: this.estado, nombre: this.estadoNombre, idformaenvio: this.idformaenvio});
  }

  public toasterconfig : ToasterConfig = 
  new ToasterConfig({
      showCloseButton: true, 
      tapToDismiss: false, 
      timeout: 0,
      positionClass:'toast-center'
  });
  
  getPedidos(estado){
    this.estadoNombre = estado.nombre;
    this.pedidosService.getPedidoPorEstadoyformaenvio(estado.idestado, this.idformaenvio).map(response => response.json()).subscribe((result: any) => {
      this.pedidos = result;
    });
  }

  getFormasEnvio(){
    this.formasEnvioService.getFormasEnvio().map(response => response.json()).subscribe((result: any) => {
      this.formasenvios = result;
    });
  }
  
  getFormasPagos(){
    this.formasPagosService.getFormasPagos().map(response => response.json()).subscribe((result: any) => {
      this.formapago = result;
    });
  }

  getEstados(){
    this.estadosService.getEstados().map(response => response.json()).subscribe((result: any) => {
      this.estados = result;
      if(this.estado > 0){
        var nombre = this.estados.filter(item => item.id == this.estado)[0].nombre;
        this.estadoNombre = nombre;
      }
    });
  }
  
  setEstiloFormaEnvio(idformaenvio){
    var fe = this.formasenvios.find(x => x.id == idformaenvio);
    return {
      'background-color': fe.color
    }
  }

  imprimirPedido(pedidoId){
    this.printcardComponent.printPedido(pedidoId);
  }

  imprimirEtiquetaML(pedidoId){
   window.open("https://myaccount.mercadolibre.com.ar/sales/shipments/printShipmentsLabels?ids=" + parseInt(pedidoId) + "", "_blank");
  }

  updatePedido(data){
    this.pedidoInfo = this.pedidos.find(x => x._id == data);
    let event = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(this.buttonModalEdit.nativeElement, 'dispatchEvent', [event]);
  }

  modalFacturar(data){
    this.pedidoInfo = this.pedidos.find(x => x._id == data);
    this.nrofactura = this.pedidoInfo.numerofactura;
    let event = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(this.buttonModalFacturar.nativeElement, 'dispatchEvent', [event]);
  }

  modalEnviar(data){
    this.pedidoInfo = this.pedidos.find(x => x._id == data);
    this.envionumeroguia = this.pedidoInfo.envionumeroguia;
    this.comentario = this.pedidoInfo.comentario;
    let event = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(this.buttonModalEnviar.nativeElement, 'dispatchEvent', [event]);
  }
  

  enviarPedido(){
    this.pedidoInfo.envionumeroguia = this.envionumeroguia;
    this.pedidoInfo.fechaenviado = new Date();
    this.pedidoInfo.comentario = this.comentario;
    this.pedidosService.grabarPedido(this.pedidoInfo)
    .subscribe((data)=> {
      console.log(`Received response: ${data}`);
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
    })
    this.renderer.invokeElementMethod(this.buttonModalFacturarCancel.nativeElement, 'dispatchEvent', [event])
  }

  facturarPedido(){
    this.pedidoInfo.facturado = true;
    this.pedidoInfo.estado = 6; //estado facturado
    this.pedidoInfo.numerofactura = this.nrofactura;
    this.pedidoInfo.fechafacturado = new Date();
    this.pedidosService.grabarPedido(this.pedidoInfo)
    .subscribe((data)=> {
      console.log(`Received response: ${data}`);
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
    })
    this.renderer.invokeElementMethod(this.buttonModalFacturarCancel.nativeElement, 'dispatchEvent', [event])
  }

  grabarPedido(){
    this.pedidosService.grabarPedido(this.pedidoInfo)
    .subscribe((data)=> {
      this.getPedidos({idestado: this.estado, nombre: this.estadoNombre, idformaenvio: this.idformaenvio});
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
    })
    this.renderer.invokeElementMethod(this.buttonModalCancel.nativeElement, 'dispatchEvent', [event])
  }
  // http://codeseven.github.io/toastr/demo.html
  eliminarPedido(_id){
    this.pedidosService.eliminarPedido(_id)
    .subscribe(()=> {
      this.toasterService.pop('success', 'Información', 'Se elimino el registro.');
      this.getPedidos({idestado: this.estado, nombre: this.estadoNombre, idformaenvio: this.idformaenvio});
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
    })
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

  sendmail(){
    this.pedidosService.sendmail()
    .subscribe(()=> {
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
    })
  }
}
