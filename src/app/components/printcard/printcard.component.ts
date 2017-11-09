import { Component, Input,OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-printcard',
  templateUrl: './printcard.component.html',
  styleUrls: ['./printcard.component.css']
})
export class PrintcardComponent implements OnInit {
  pedido : any;
  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    this.pedido = {};
  }

  printPedido(idPedido){
    this.pedidosService.getPedidoPorId(idPedido).subscribe(data => {
      this.pedido = data;
      var texto = '<div><h1>Impresion de pedido</h1>Nombre: '+this.pedido.nombre+' <br><br> Direccion '+this.pedido.enviodireccion+'<br><br> Provincia<br><br> Telefono '+this.pedido.telefono+'<br><br><img src="../../../assets/logomiler.png" /></div>';
      let popupWinindow
      popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + texto + '</html>');
      popupWinindow.document.close();
    });
  }
}
