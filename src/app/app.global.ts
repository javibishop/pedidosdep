import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
     token: string = '';
     serviceurl = 'https://millped.herokuapp.com/';
	 curf='';
	idmercadolibre = '172177242';
     idformaenviodefault = '1';
     idestadodefault = '1';
     idformapagodefault = '1';
}