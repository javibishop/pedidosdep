import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; 

import { AppComponent } from './app.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { HttpModule }    from '@angular/http';
import { Http, Response } from '@angular/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DragulaModule } from 'ng2-dragula';
import { DragulaComponent } from './components/dragula/dragula.component';
import { routing } from './app.routes';
import { PedidoslistaComponent } from './pedidoslista/pedidoslista.component';
import { PrintcardComponent } from './components/printcard/printcard.component';
import { ToolbarestadosComponent } from './components/toolbarestados/toolbarestados.component';
import { MenuformasenviosComponent } from './components/menuformasenvios/menuformasenvios.component';
import { FormaenvioComponent } from './formaenvio/formaenvio.component';
import { FormaspagosComponent } from './formaspagos/formaspagos.component';
import { MenuestadosComponent } from './components/menuestados/menuestados.component';
import { TruncatePipe } from './pipes/truncate';
import { ChartsModule } from 'ng2-charts';
import { GpedidosxformaenvioComponent } from './components/gpedidosxformaenvio/gpedidosxformaenvio.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { AppGlobals } from './app.global';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { UsersingupComponent } from './components/usersingup/usersingup.component';
import { PedidoeditorComponent } from './components/pedidoeditor/pedidoeditor.component';
import { EstadosComponent } from './estados/estados.component';

// https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407
@NgModule({
  declarations: [
    AppComponent,
    PedidosComponent,
    NavbarComponent,
    DropdownComponent,
    DragulaComponent,
    PedidoslistaComponent,
    PrintcardComponent,
    ToolbarestadosComponent,
    MenuformasenviosComponent,
    FormaenvioComponent,
    FormaspagosComponent,
    MenuestadosComponent,
    TruncatePipe,
    GpedidosxformaenvioComponent,
    UserloginComponent,
    UsersingupComponent,
    PedidoeditorComponent,
    EstadosComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    DragulaModule,
    routing,
    ChartsModule,
    BrowserAnimationsModule,
    ToasterModule
  ],
  providers: [AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule { 
constructor(){}


}
