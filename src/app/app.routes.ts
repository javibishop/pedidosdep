// ====== ./app/app.routes.ts ======

// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosComponent } from 'app/pedidos/pedidos.component';
import { FormaenvioComponent } from 'app/formaenvio/formaenvio.component';
import { FormaspagosComponent } from 'app/formaspagos/formaspagos.component';
import { EstadosComponent } from 'app/estados/estados.component';
import { PedidoslistaComponent } from 'app/pedidoslista/pedidoslista.component';
import { GpedidosxformaenvioComponent } from 'app/components/gpedidosxformaenvio/gpedidosxformaenvio.component';
import { UserloginComponent } from 'app/components/userlogin/userlogin.component';
import { UsersingupComponent } from 'app/components/usersingup/usersingup.component';
import { VentasmlComponent } from 'app/ventasml/ventasml.component';

// Route Configuration
export const routes: Routes = [
  { path: 'pedidos', component: PedidosComponent },
  { path: 'pedidoslista', component: PedidoslistaComponent },
  { path: 'pedidoslista/:estado', component: PedidoslistaComponent },
  { path: 'gpedidosxformaenvio', component: GpedidosxformaenvioComponent },
  { path: 'formasenvio', component: FormaenvioComponent },
  { path: 'formaspago', component: FormaspagosComponent },
  { path: 'estados', component: EstadosComponent },
  { path: 'login', component: UserloginComponent },
  { path: 'singup', component: UsersingupComponent },
{ path: 'ventasml', component: VentasmlComponent}
  
  //,{ path: 'dogs', component: DogListComponent }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);


//https://embed.plnkr.co/?show=preview ejemplo completo de heroes