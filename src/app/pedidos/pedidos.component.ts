import { Component, OnInit, Input, Output, EventEmitter,Renderer, ElementRef, ViewChild } from '@angular/core';
import { PedidosService } from '../services/pedidos.service' ;
import { DragulaService } from 'ng2-dragula';
import { IDragula } from '../components/dragula/dragula.interface'
import { Dragula } from '../components/dragula/dragula.class'
import { IPedido } from '../../../server/models/pedido.interface'
import { ActivatedRoute, Router} from '@angular/router';
import { FormasEnvioService } from '../services/formasenvio.service';
import { FormasPagosService } from '../services/formaspagos.service';
import { EstadosService } from '../services/estados.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  @ViewChild('buttonModalEdit') buttonModalEdit:ElementRef;
  @ViewChild('buttonModalCancel') buttonModalCancel:ElementRef;

  integradoConMercadoLibre = true;
  userInfo = {};
  token = "APP_USR-6048120304954368-110318-96c759373ad02c752ed1c8bf17bf6aa8__B_G__-172177242";
  pedidoId = 0;
  pedidoInfo : IPedido;
  pedidosPorEnvio = [];
  pedidosPendientes = [];
  pedidosAPreparar = [];
  pedidosPreparados = [];
  pedidosFinalizados = [];
  pedidosEntregados = [];
  pedidosPaneles = [];
  formasenvio = [];
  pedidos = [];
  tokeninfo = {};
  estados= [];
  colores= [];
  formapago= [];
  formaenvio = [];
  idFormaEnvioActual=0;
  finalizados=0;
  apreparar=0;
  preparados=0;
  entregados=0;
  pendientes=0;
  nuevoPedido=false;
  estado='';
  envioforma='';
  pagoforma='';
  espedidomercadolibre = false;
  colorformaenvio:string;

  public dA :  IDragula[] = [];
  public dAPreparar :  IDragula[] = [];
  public dPreparado :  IDragula[] = [];
  public dEntregado :  IDragula[] = [];
  private color: string = "#127bdc";
  constructor(private pedidosService: PedidosService, private formaenvioService: FormasEnvioService,private formasPagosService: FormasPagosService,
    private estadosService: EstadosService,
    private renderer: Renderer, private route:Router) { }

  ngOnInit() {
    this.pedidoInfo = this.createPedido();
    this.pedidosPorEnvio = [];
    this.tokeninfo  = {};
    this.pedidosPendientes = [];
    this.pedidosAPreparar = [];
    this.pedidosPreparados = [];
    this.pedidosFinalizados = [];
    this.pedidosEntregados = [];
    this.pedidosPaneles = [];
    this.pedidos = [];
    this.finalizados=0;
    this.apreparar=0;
    this.preparados=0;
    this.entregados=0;
    this.pendientes=0;
    this.nuevoPedido=false;
    this.integradoConMercadoLibre = true;
    this.idFormaEnvioActual = 1;
    this.espedidomercadolibre = false;
    this.getFormasEnvio();
    this.getFormasPagos();
    this.getEstados();
    this.obtenerPedidosPorFormaEnvio({id:1, color: 'red'});
    
    //this.colores   = [{value:'', label:'Sin Color'},{value:'red', label:'Rojo'},{value:'green', label:'Verde'},{value:'blue', label:'Azul'},{value:'yellow', label:'Amarillo'} ,{value:'orange', label:'Naranja'}];
  }

  /*Se llama desde el modal de edicion o alta del pedido*/
  grabarPedido(){
    this.pedidosService.grabarPedido(this.pedidoInfo).subscribe(data => {
      this.pedidoInfo = this.createPedido();
      this.obtenerPedidosPorFormaEnvio({id:this.idFormaEnvioActual, color: this.colorformaenvio});
      });
  }
  
  /*Cuando se edita desde dragula, levanta el modal de edicion*/
  editarPedidoEnModal(data){
    let event = new MouseEvent('click', {bubbles: true});
    this.pedidoInfo = this.pedidos.find(x => x._id == data.id);
    this.pedidoId = data.idPedido;
    this.renderer.invokeElementMethod(this.buttonModalEdit.nativeElement, 'dispatchEvent', [event]);
  }

  /*Cuando se finalizar desde dragula, cambia el estado a finalizado*/
  finalizarPedido(data){
    var pedido = this.pedidos.find(x => x._id == data.id);
    pedido.estado = '5';
    this.pedidosService.actualizarPedido(pedido).subscribe(dataresult => {
      this.obtenerPedidosPorFormaEnvio({id:this.idFormaEnvioActual, color: this.colorformaenvio});
    });
  }
  
  /*Obtiene los pedidos por forma de envio, tambien se ejecuta al cambiar de fomra de envio desde la toolbar*/
  obtenerPedidosPorFormaEnvio(formaenvio){
    this.idFormaEnvioActual = formaenvio.id;
    this.colorformaenvio = formaenvio.color;
    this.pedidosService.getPedidosPorEnvioForma(formaenvio.id).map(response => response.json()).subscribe((result: any) => {
      this.pedidos = result;
      this.contarPedidosYArmarArrayDragula();
      this.getPedidoCountPorFormaEnvio();
    });
  }

  /*Cuenta los pedidos segun el estado y arma los 3 arrays para pasar a dragula y mostrarlos en el mismo*/
  contarPedidosYArmarArrayDragula(){
    this.pedidosPendientes = this.pedidos.filter(x => x.estado == 1);
    this.pendientes = this.pedidosPendientes.length;
    
    this.pedidosFinalizados = this.pedidos.filter(x => x.estado == 5);
    this.finalizados = this.pedidosFinalizados.length;

    this.pedidosAPreparar = this.pedidos.filter(x => x.estado == 2);
    if(this.pedidosAPreparar){
      this.apreparar = this.pedidosAPreparar.length;
      this.dAPreparar = [];
      for (var i = 0, a = this.pedidosAPreparar.length; i < a; i++) {
        this.dAPreparar.push(this.mapToDragula(this.pedidosAPreparar[i]));
      }
    }

    this.pedidosPreparados = this.pedidos.filter(x => x.estado == 3);
    if(this.pedidosPreparados){
      this.preparados = this.pedidosPreparados.length;
      this.dPreparado = [];
      for (var i = 0, b = this.pedidosPreparados.length; i < b; i++) {
        this.dPreparado.push(this.mapToDragula(this.pedidosPreparados[i]));
      }
    }

    this.pedidosEntregados = this.pedidos.filter(x => x.estado == 4);
    if(this.pedidosEntregados){
      this.entregados = this.pedidosEntregados.length;
      this.dEntregado = [];
      for (var i = 0, c = this.pedidosEntregados.length; i < c; i++) {
        this.dEntregado.push(this.mapToDragula(this.pedidosEntregados[i]));
      }
    }
  }
 
  /*Obtiene el group de pedidos por forma de envio para mostrar en la toolbar de envios*/
  getPedidoCountPorFormaEnvio(){
    this.pedidosService.getPedidoCountPorFormaEnvio().map(response => response.json()).subscribe((result: any) => {
      this.pedidosPorEnvio = result
    });
  }

  /*http://www.oodlestechnologies.com/blogs/Angular-2-Parent-and-Child-Component-Communication*/
  
  /*Actualiza el estado de un pedido cuando se cambia de columna en el dragula*/
  actualizarEstado(data){
    var pedido = null;
    
    switch(data.estadoOrigen)
    {
      case 2:
      /*aPreparar*/
      pedido = this.pedidosAPreparar.find(x => x._id == data.id);
      break;
      case 3:
      /*preparados*/
      pedido = this.pedidosPreparados.find(x => x._id == data.id);  //revisar aca que esta undefined
      break;
      case 4:
      /*entregados*/
      pedido = this.pedidosEntregados.find(x => x._id == data.id);
      break;
    }
    if(pedido){
      
      pedido.estado = data.estadoDestino;
      var fechapreparado:Date = null;
      var fechaentregado:Date = null;
      var fechaapreparar:Date = null;

      switch(data.estadoDestino)
      {
        case 2:
        /*aPreparar*/
        fechaapreparar = new Date();
        break;
        case 3:
        /*preparados*/
        fechapreparado = new Date();
        break;
        case 4:
        /*entregados*/
        fechaentregado = new Date();
        break;
      }

      pedido.fechapreparado = fechapreparado;
      pedido.fechaentregado = fechaentregado;

      this.pedidosService.actualizarPedido(pedido).subscribe(dataresult => {
        this.obtenerPedidosPorFormaEnvio({id:this.idFormaEnvioActual, color: this.colorformaenvio});
      });
    }
  }

  iralistadopedido(estado){
    this.route.navigate(['/pedidoslista/'], { queryParams: { estado: estado } });
  }
  mostrarAltaPedido() {
    this.nuevoPedido = ! this.nuevoPedido;
  }
  loadToken() {
    this.pedidosService.getTokenInfo().subscribe(data => 
    this.tokeninfo = data
    );
  }

  loadUserInfo() {
    this.pedidosService.getUserInfo(103767).subscribe(data => 
    this.userInfo = data
    );
  }

  getFormasEnvio(){
    this.formaenvioService.getFormasEnvio().map(response => response.json()).subscribe((result: any) => {
      this.formaenvio = result;
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
    });
  }

  /*Obtiene la info del pedido de mercado libre, necesita token y nro de pedido ml*/
  getPedidoInfo(){
    if(this.integradoConMercadoLibre){
      this.pedidosService.getPedidoInfo(this.pedidoInfo.id, this.token).subscribe(data => {
        this.pedidoInfo = this.mapPedidoMLibreToIPedido(data)
        this.espedidomercadolibre = true;
      });
      }
      else{
        this.pedidoInfo = this.createPedido();
        this.espedidomercadolibre = false;
      }
  }

  selectestado(valor){
    this.estado = valor;
    this.pedidoInfo.estado = this.estado;
  }
  selectenvioforma(valor){
    this.envioforma = valor;
    this.pedidoInfo.envioforma = this.envioforma;
  }
  selectpagoforma(valor){
    this.pagoforma=valor;
    this.pedidoInfo.pagoforma = this.pagoforma;
  }

  mapToDragula(pedido) : IDragula{
      var estilo = {
        'background-color': 'red'
      };
      
      var tooltip = 'Tel:' + pedido.telefono + '\n' + 'Nombre: ' + pedido.nombre + '\n' + 'Alta: ' + (pedido.fechaalta ?  pedido.fechaalta.slice(0,10) : '') + '\n' + 'Preparado: ' + (pedido.fechapreparado ? pedido.fechapreparado.slice(0,10) : '') + '\n' + 'Facturado: ' + (pedido.fechafacturado ? pedido.fechafacturado.slice(0,10) :  '')+ '\n' + 'Enviado: ' + (pedido.fechaenviado ? pedido.fechaenviado.slice(0,10) :  '')+ '\n' + 'Recibido: ' + (pedido.fecharecibido ? pedido.fecharecibido.slice(0,10) :  '') + '\n' + 'Finalizado: ' + (pedido.fechafinalizado ?  pedido.fechafinalizado.slice(0,10) :  '') ;
      var dragula = new Dragula(pedido._id, pedido.envioidmercadolibre, pedido.id, pedido.nombre, pedido.numerooc, pedido.numerocliente, (pedido.pagosolicitadinero > 0), (pedido.envioadeuda  > 0), pedido.color1, tooltip);
      return dragula;
  }

  /*Mapea los campos que vienen de mlibre a el pedido */
  mapPedidoMLibreToIPedido(body) : IPedido{
    let pedido2 = {} as IPedido;
    if(body.shipping && body.shipping.shipping_mode && body.shipping.shipping_mode === 'me2'){
      pedido2.envioidmercadolibre = body.shipping.id;
    }

    pedido2.id = body.id,
    pedido2.nombre= body.buyer.first_name + ' ' + body.buyer.last_name,
    pedido2.usuario= body.buyer.nickname,
    pedido2.telefono= (body.buyer.phone.area_code || '') + '-' +body.buyer.phone.number,
    pedido2.mail= body.buyer.email,
    pedido2.documento= body.buyer.billing_info.doc_type + '-' + body.buyer.billing_info.doc_number,
    pedido2.envionumeroguia = '',
    pedido2.estado= body.estado,
    pedido2.facturado= false,
    pedido2.numerocliente= body.numerocliente,
    pedido2.numerofactura= body.numerofactura,
    pedido2.numeropedido= body.numeropedido,
    pedido2.numerooc= body.numerooc,
    pedido2.comentario= body.comentario,
    pedido2.envioforma= body.envioforma,
    pedido2.enviodireccion= body.shipping.receiver_address ? (body.shipping.receiver_address.address_line ? body.shipping.receiver_address.address_line : '') : '',
    pedido2.enviosucursal= '',
    pedido2.envioadeuda= body.envioadeuda,
    pedido2.pagoforma= body.pagoforma,
    pedido2.pagoestado= '',
    pedido2.pagosolicitadinero = 0,
    pedido2.pagosolicitadinerocobrado = false 
    pedido2.fechaalta = null,
		pedido2.fechapreparado= null,
		pedido2.fechaentregado= null,
		pedido2.fechafinalizado= null,
		pedido2.fechafacturado= null,
		pedido2.fechaenviado= null,
		pedido2.fecharecibido= null
    return pedido2;
  };

  /*Crea un IPedido vacio */
  createPedido() : IPedido{
    let pedido2 = {} as IPedido;
    pedido2.id = 0,
    pedido2.nombre= '',
    pedido2.usuario= '',
    pedido2.telefono= '',
    pedido2.mail = '',
    pedido2.documento= '',
    pedido2.envionumeroguia = '',
    pedido2.estado= '1',
    pedido2.facturado = false,
    pedido2.numerocliente= '',
    pedido2.numerofactura= '',
    pedido2.numeropedido= '',
    pedido2.numerooc= '',
    pedido2.comentario= '',
    pedido2.envioidmercadolibre = 0;
    pedido2.envioforma= '1',
    pedido2.enviodireccion=  '',
    pedido2.enviosucursal= '',
    pedido2.envioadeuda= 0,
    pedido2.pagoforma = '1',
    pedido2.pagoestado = '',
    pedido2.pagosolicitadinero = 0,
    pedido2.pagosolicitadinerocobrado= false,
    pedido2.fechaalta = new Date(),
		pedido2.fechapreparado= null,
		pedido2.fechaentregado= null,
		pedido2.fechafinalizado= null,
		pedido2.fechafacturado= null,
		pedido2.fechaenviado= null,
		pedido2.fecharecibido= null 
    return pedido2;
  };
}
