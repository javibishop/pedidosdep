import { Component, OnInit, Directive, ElementRef, ContentChild, Output, EventEmitter, Input } from '@angular/core';

// import { Ng2Dropdown } from '../../../node_modules/ng2-material-dropdown/dist/src/modules/components/dropdown/ng2-dropdown';
// import { Ng2DropdownMenu } from '../../../node_modules/ng2-material-dropdown/dist/src/modules/components/menu/ng2-dropdown-menu';
// import { Ng2DropdownButton } from '../../../node_modules/ng2-material-dropdown/dist/src/modules/components/button/ng2-dropdown-button';
// import { Ng2MenuItem } from '../../../node_modules/ng2-material-dropdown/dist/src/modules/components/menu-item/ng2-menu-item';

// @Component({
//     selector: 'dropdown-container',
//     providers: [ ],
//     template: `<ng2-dropdown>
//                     <ng2-dropdown-button>Open</ng2-dropdown-button>
//                     <ng2-dropdown-menu>
//                         <ng2-menu-item *ngFor="let option of options" [value]="option">
//                             {{ option.value }}
//                         </ng2-menu-item>
//                     </ng2-dropdown-menu>
//                </ng2-dropdown>`
// })
// export class DropdownContainer {
//     options = [{value: 'me'}];
// }

export class DropdownValue {
  value:string;
  label:string;

  constructor(value:string,label:string) {
    this.value = value;
    this.label = label;
  }
}

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  template: `
    <select>
      <option  *ngFor="let value of values" (click)="select(value.value)">{{value.label}}</option>
    </select>
  `
})

export class DropdownComponent {
  @Input()
  values: DropdownValue[];

  @Input()
  value: string[];

  @Output()
  valueChange = new EventEmitter();

  constructor(private elementRef:ElementRef) {
    this.valueChange = new EventEmitter();
  }

  select(value) {
    this.valueChange.emit(value);
  }
}