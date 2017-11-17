import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  obtenertoken(){
    window.location.href = "https://auth.mercadolibre.com.ar/authorization?response_type=token&client_id=6048120304954368";
  }
}
