import { Component, OnInit,EventEmitter,Renderer, Output, ElementRef, ViewChild } from '@angular/core';
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
  enviarmail: boolean;
  pedidos = [];
  estado = 0;
  pedidoInfo : any;
  estados= [];
  formasenvios = [];
  nrofactura : string;
  envionumeroguia : string;
  estadoNombre: string;
  comentario: string;
  idformaenvio: 0;
  token = "";
  pedidosPorEstadosCount = [];
  valorbuscar:string;
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
    this.valorbuscar = '';
    this.estado = Number(this.estado);
    this.estadoNombre ='en todos los Estados';
    this.getFormasEnvio();
    // this.getFormasPagos();
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
  /*
  1-pedidos por estado para la lista.
  2-estados con contador.
  3-actualizar contador por cada grabar de un pedido.
   */
  getPedidos(estado){
    this.estadoNombre = estado.nombre;
    this.estado = estado.idestado;
    this.pedidosService.getPedidoPorEstadoyformaenvio(estado.idestado, this.idformaenvio).map(response => response.json()).subscribe((result: any) => {
      this.pedidos = result;
      this.getPedidoCountPorFormaEnvio();
    });
  }

  getFormasEnvio(){
    this.formasEnvioService.getFormasEnvio().map(response => response.json()).subscribe((result: any) => {
      this.formasenvios = result;
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
  
     /*Obtiene el group de pedidos por forma de envio para mostrar en la toolbar de envios*/
    getPedidoCountPorFormaEnvio(){
      this.pedidosService.getPedidoCountPorEstado().map(response => response.json()).subscribe((result: any) => {
        this.pedidosPorEstadosCount = result
      });
    }

  setEstiloFormaEnvio(idformaenvio){
    var fe = this.formasenvios.find(x => x.id == idformaenvio);
    return {
      'color': fe.color
      //'border-top-color': fe.color
    }
  }

  setEstiloEstado(estado){
    var fe = this.estados.find(x => x.id == parseInt(estado) );
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

  pedidoGraboExito(){
    this.getPedidos({idestado: this.estado, nombre: this.estadoNombre, idformaenvio: this.idformaenvio});
  }

  pedidoGraboError(){
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
    let event2 = new MouseEvent('click', {bubbles: true});
    this.pedidoInfo.envionumeroguia = this.envionumeroguia;
    this.pedidoInfo.fechaenviado = new Date();
    this.pedidoInfo.comentario = this.comentario;
    this.pedidosService.grabarPedido(this.pedidoInfo)
    .subscribe((data)=> {
      if(this.enviarmail){
        this.sendmail();
        this.renderer.invokeElementMethod(this.buttonModalFacturarCancel.nativeElement, 'dispatchEvent', [event2])
      }
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
    })
  }

  sendmail(){
    this.pedidosService.sendmail({comentario: this.pedidoInfo.comentario, envionumeroguia:this.pedidoInfo.envionumeroguia,destinatario: this.pedidoInfo.mail})
    .subscribe(()=> {
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
    })
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

  buscarPedido(){
    this.pedidosService.buscar(this.valorbuscar).map(response => response.json()).subscribe((result: any) => {
      this.pedidos = result;
    });
  }

  refreshPedidos(){
    this.getPedidos({idestado: this.estado, nombre: this.estadoNombre, idformaenvio: this.idformaenvio});
  }
}
