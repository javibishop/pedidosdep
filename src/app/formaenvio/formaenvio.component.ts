import { Component, OnInit } from '@angular/core';
import {FormasEnvioService} from '../services/formasenvio.service';

@Component({
  selector: 'app-formaenvio',
  templateUrl: './formaenvio.component.html',
  styleUrls: ['./formaenvio.component.css']
})
export class FormaenvioComponent implements OnInit {

  formasenvio: any;
  constructor(private formasEnvioService: FormasEnvioService) { }

  ngOnInit() {
  }

 
}
