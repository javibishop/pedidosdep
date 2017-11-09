  import { Component, OnInit } from '@angular/core';
  import { FormasEnvioService } from '../../services/formasenvio.service';
  import { PedidosService } from '../../services/pedidos.service';

  @Component({
    selector: 'app-gpedidosxformaenvio',
    templateUrl: './gpedidosxformaenvio.component.html',
    styleUrls: ['./gpedidosxformaenvio.component.css']
  })
 export class GpedidosxformaenvioComponent implements OnInit{
  formaenvio = [];
  pedidosPorEnvio = [];

  constructor(private formaenvioService: FormasEnvioService, private pedidosService: PedidosService){   }

  ngOnInit() {
    this.getFormasEnvio();
   }
   
   public barChartOptions:any = {
     scaleShowVerticalLines: false,
     responsive: true
   };
   public barChartLabels:string[] = ['Moto','OCA','Encomienda','Ecotrans','Mercado Envios', 'EnvioPack'];
   public barChartType:string = 'line';
   public barChartLegend:boolean = true;
  
   public barChartData:any[] = [
    // {data: [0,2,3,4,5], label: 'Series A'}, uno por label con 5 adentro de cada label.
    // {data: [1,2,3,4,5], label: 'Series A'},
    // {data: [1,2,3,4,5], label: 'Series A'},
    // {data: [1,2,3,4,5], label: 'Series A'},
    // {data: [1,2,3,4,5], label: 'Series A'},
    // {data: [1,2,3,4,5,7], label: 'Series A'}
    {data: [0], label: ''}
    // {data: [1], label: ''},
    // {data: [1], label: ''},
    // {data: [1], label: ''},
    // {data: [1], label: ''},
    // {data: [1], label: ''}
  ];
  
   getPedidoCountPorFormaEnvio(){
    this.pedidosService.getPedidoCountPorFormaEnvioChart().map(response => response.json()).subscribe((result: any) => {
      this.pedidosPorEnvio = result;
      //this.actualizarcontadores();
    });
  }

   getFormasEnvio(){
    this.formaenvioService.getFormasEnvio().map(response => response.json()).subscribe((result: any) => {
      this.formaenvio = result;
      this.getPedidoCountPorFormaEnvio();
    });
  }

  actualizarcontadores(){
    var data1 = [];
    this.barChartData = [];
    this.barChartLabels = [];
    //formas de envio titulo
    if(this.pedidosPorEnvio && this.formaenvio){
      for (var i = 0, b = this.formaenvio.length; i < b; i++) {
        this.barChartLabels.push(this.formaenvio[i].nombre);

        this.formaenvio[i].cantidad = 0;
        for (var x = 0, z = this.pedidosPorEnvio.length; x < z; x++) {
          if(this.pedidosPorEnvio[x]._id == this.formaenvio[i].id){
            this.formaenvio[i].cantidad = this.pedidosPorEnvio[x].total;
            // data1.push({data : [this.pedidosPorEnvio[x].total], label: this.formaenvio[i].nombre});
            data1.push(this.pedidosPorEnvio[x].total);
            break;
          }
        }  
      }

      

      this.barChartData = data1;
      
      // let clone = JSON.parse(JSON.stringify(this.barChartData));
      // for (var i = 0, b = data1.length; i < b; i++) {
      //   clone[i].data = data1[i].data;
      // }
      
      // this.barChartData = clone;

      // let clone = JSON.parse(JSON.stringify(this.barChartData));
      // clone[0].data = data1.toString();
      // this.barChartData = clone;
    }
  }
  
   // events
   public chartClicked(e:any):void {
     console.log(e);
   }
  
   public chartHovered(e:any):void {
     console.log(e);
   }
  
   public randomize():void {
     // Only Change 3 values
     let data = [
       Math.round(Math.random() * 100),
       59,
       80,
       (Math.random() * 100),
       56,
       (Math.random() * 100),
       40];
     let clone = JSON.parse(JSON.stringify(this.barChartData));
     clone[0].data = data;
     this.barChartData = clone;
     /**
      * (My guess), for Angular to recognize the change in the dataset
      * it has to change the dataset variable directly,
      * so one way around it, is to clone the data, change it and then
      * assign it;
      */
   }
 }
