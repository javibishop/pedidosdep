import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-toolbarestados',
  templateUrl: './toolbarestados.component.html',
  styleUrls: ['./toolbarestados.component.css']
})
export class ToolbarestadosComponent implements OnInit {
  private _pendientes: number;
  private _apreparar: number;
  private _preparados: number;
  private _entregados: number;
  private _finalizados: number;
  private _facturados: number;
  private _formaenvioactual: number;

  @Input() set pendientes(pendientes: number) {
    this._pendientes = pendientes;
    }
    get pendientes(): number { return this._pendientes; }

  @Input() set apreparar(apreparar: number) {
  this._apreparar = apreparar;
  }
  get apreparar(): number { return this._apreparar; }

  @Input() set preparados(preparados: number) {
    this._preparados = preparados;
    }
    get preparados(): number { return this._preparados; }

  @Input() set entregados(entregados: number) {
    this._entregados = entregados;
    }
    get entregados(): number { return this._entregados; }

  @Input() set finalizados(finalizados: number) {
    this._finalizados = finalizados;
    }
    get finalizados(): number { return this._finalizados; }

  @Input() set facturados(facturados: number) {
    this._facturados = facturados;
    }
    get facturados(): number { return this._facturados; }

  @Input() set formaenvioactual(formaenvioactual: number) {
    this._formaenvioactual = formaenvioactual;
    }
    get formaenvioactual(): number { return this._formaenvioactual; }

  constructor(private route:Router) { }

  ngOnInit() {
  }

  iralistadopedido(estado){
    this.route.navigate(['/pedidoslista/'], { queryParams: { estado: estado, idformaenvio: this.formaenvioactual } });
  }
}
