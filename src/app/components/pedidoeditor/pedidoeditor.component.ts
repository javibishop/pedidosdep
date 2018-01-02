import { Component, OnInit,EventEmitter,Renderer, ElementRef, Output, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PedidosService } from '../../services/pedidos.service';
import { FormasEnvioService } from '../../services/formasenvio.service';
import { FormasPagosService } from '../../services/formaspagos.service';
import { EstadosService } from '../../services/estados.service';
import { IPedido } from '../../../../server/models/pedido.interface'
import { AppGlobals } from "../../app.global"
import {PedidoHelper} from '../../helper/pedidohelper';

@Component({
  selector: 'app-pedidoeditor',
  templateUrl: './pedidoeditor.component.html',
  styleUrls: ['./pedidoeditor.component.css']
})
export class PedidoeditorComponent implements OnInit {
  private pedidoInfo: any;
  @Input() set pedidoAEditar(pedidoAEditar: any) {
    this.pedidoInfo = pedidoAEditar;
    }
    get pedidoAEditar(): any { return this.pedidoInfo; }

  @Output() gabroPedidoExito: EventEmitter<any> = new EventEmitter();
  @Output() gabroPedidoError: EventEmitter<any> = new EventEmitter();
  tokenml: string;
  estados= [];
  formasdepago = [];
  formasenvios = [];
  integradoConMercadoLibre = true;
  
  constructor(private pedidosService: PedidosService, private route:ActivatedRoute, private renderer: Renderer, private formasEnvioService: FormasEnvioService,private formasPagosService: FormasPagosService,
    private estadosService: EstadosService, private global: AppGlobals, private pedidoHelper: PedidoHelper) {}

  ngOnInit() {
    this.integradoConMercadoLibre = true;
    this.getFormasEnvio();
    this.getFormasPagos();
    this.getEstados();
    this.tokenml =  localStorage.getItem("tokenml");
  }

  grabarPedido(){
    this.pedidosService.grabarPedido(this.pedidoInfo)
    .subscribe((data)=> {
      /*emitir evento para informar que grabo con exito*/
      this.gabroPedidoExito.emit(); 
    },
    (err)=>{
      console.log(`Oops, an error occurred`);
      console.log(`Error: ${err}`);
      this.gabroPedidoError.emit(); 
    })
  }

  getFormasEnvio(){
    this.formasEnvioService.getFormasEnvio().map(response => response.json()).subscribe((result: any) => {
      this.formasenvios = result;
    });
  }
  
  getFormasPagos(){
    this.formasPagosService.getFormasPagos().map(response => response.json()).subscribe((result: any) => {
      this.formasdepago = result;
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
        this.pedidosService.getPedidoInfo(this.pedidoInfo.id, this.tokenml).subscribe(data => {
          this.pedidoInfo = this.pedidoHelper.mapPedidoMLibreToIPedido(data)
          //this.espedidomercadolibre = true;
        });
        }
        else{
          //this.pedidoInfo = this.createPedido();
          //this.espedidomercadolibre = false;
        }
    }
/*Mapea los campos que vienen de mlibre a el pedido */
// mapPedidoMLibreToIPedido(body) : IPedido{
//   let pedido2 = {} as IPedido;
//   if(body.shipping && body.shipping.shipping_mode && body.shipping.shipping_mode === 'me2'){
//     pedido2.envioidmercadolibre = body.shipping.id;
//   }

//   pedido2.id = body.id,
//   pedido2.nombre= body.buyer.first_name + ' ' + body.buyer.last_name,
//   pedido2.usuario= body.buyer.nickname,
//   pedido2.telefono= (body.buyer.phone.area_code || '') + '-' +body.buyer.phone.number,
//   pedido2.mail= body.buyer.email,
//   pedido2.documento= body.buyer.billing_info.doc_type + '-' + body.buyer.billing_info.doc_number,
//   pedido2.envionumeroguia = '',
//   pedido2.estado= body.estado,
//   pedido2.facturado= false,
//   pedido2.numerocliente= body.numerocliente,
//   pedido2.numerofactura= body.numerofactura,
//   pedido2.numeropedido= body.numeropedido,
//   pedido2.numerooc= body.numerooc,
//   pedido2.comentario= body.comentario,
//   pedido2.envioforma= body.envioforma,
//   pedido2.enviodireccion= body.shipping.receiver_address ? (body.shipping.receiver_address.address_line ? body.shipping.receiver_address.address_line : '') : '',
//   pedido2.enviosucursal= '',
//   pedido2.envioadeuda= body.envioadeuda,
//   pedido2.enviobultos=1,
//   pedido2.enviobarrio = body.enviobarrio,
//   pedido2.enviocp = body.enviocp,
//   pedido2.pagoforma= body.pagoforma,
//   pedido2.enviolocalidad = body.shipping.receiver_address ? (body.shipping.receiver_address.city ? body.shipping.receiver_address.city.name : '') : '',
//   pedido2.envioprovincia = body.shipping.receiver_address ? (body.shipping.receiver_address.state ? body.shipping.receiver_address.state.name : '') : '',
//   pedido2.enviocp = body.shipping.receiver_address ? (body.shipping.receiver_address.zip_code ? body.shipping.receiver_address.zip_code : '') : '',
//   pedido2.envioacosto = body.shipping.shipping_option ? (body.shipping.shipping_option.cost ? body.shipping.shipping_option.cost : 0) : 0,
//   pedido2.pagoestado= '',
//   pedido2.pagosolicitadinero = 0,
//   pedido2.pagosolicitadinerocobrado = false 
//   pedido2.fechaalta = null,
//   pedido2.fechapreparado= null,
//   pedido2.fechaentregado= null,
//   pedido2.fechafinalizado= null,
//   pedido2.fechafacturado= null,
//   pedido2.fechaenviado= null,
//   pedido2.fecharecibido= null
//   return pedido2;
// };
  selectestado(valor){
    this.pedidoInfo.estado = valor;
  }
  selectenvioforma(valor){
    this.pedidoInfo.envioforma = valor;
  }
  selectpagoforma(valor){
    this.pedidoInfo.pagoforma = valor;
  }
}
