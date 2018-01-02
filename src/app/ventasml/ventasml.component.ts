import { Component, OnInit } from '@angular/core';
import {PedidosService} from '../services/pedidos.service';
import {PedidoHelper} from '../helper/pedidohelper';

@Component({
  selector: 'app-ventasml',
  templateUrl: './ventasml.component.html',
  styleUrls: ['./ventasml.component.css']
})
export class VentasmlComponent implements OnInit {
  pedidos = [];
  cantidad: number;
  seleccionados: number = 0;
  pedidosIds = [];
  token: string;
  constructor(private pedidosService:PedidosService, private pedidohelper: PedidoHelper) { }

  ngOnInit() {
    this.token = localStorage.getItem("tokenml");
    this.obtenerPedidos();
  }

  obtenerPedidos(){
    this.pedidosService.getUltimasVentas(this.token).map(response => response).subscribe((result: any) => {
      for (let pml of result) {
        var pedidomapeado = this.pedidohelper.mapPedidoMLibreToIPedidoMl(pml);
        this.pedidos.push(pedidomapeado); 
        this.pedidosIds.push(Number(pedidomapeado.id));
     }

     var hola = '';
     var valor = JSON.stringify({ids: this.pedidosIds});
     this.pedidosService.getIdPedidoYaGrabado(valor).map(response => response).subscribe((result: any) => {
       var idsYaGrabados = result;
       for (let idpedidograbado of idsYaGrabados) {
        var pedido = this.pedidos.find(x => x.id == idpedidograbado.id);
        if(pedido){
          pedido.seleccionado = null;
        }
       }
       
     });
     

     this.cantidad = this.pedidos.length; 
    });
  }

  itemsastring(items){
    var valor = '';
    for (let i of items) {
      valor += i.nombre + ' - Cantidad: ' + i.cantidad;
    }
    return valor;
  }

  setChecked(idpedido, checked){
    var pedido = this.pedidos.find(x => x.id == idpedido);
    if(pedido){
      pedido.seleccionado = checked;
      if(checked)
        this.seleccionados++;
      else
        this.seleccionados--;
      //agrear una llama para ver si este valor no existe ya en la base y marcar con color.
    }
  }

  grabarPedidos(){
    let pedidosGrabar = [];
    
    for (let p of this.pedidos) {
      if(p.seleccionado){
        let pedido = this.pedidohelper.mapIPedidoMLToIPedido(p);
        pedidosGrabar.push(pedido);
      }
    }

    if(pedidosGrabar.length > 0){
      this.pedidosService.grabarPedidos(pedidosGrabar).subscribe((data)=> {
        /*emitir evento para informar que grabo con exito*/
        var exito = true;
      },
      (err)=>{
        console.log(`Oops, an error occurred`);
        console.log(`Error: ${err}`);
      })
    }
  }
}


//buscar ventas de ml por algun criterio. validar que el id de ml no este grabado. mostrarlas en una grilla con checkbox, grabar las seleccionadas.
