
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service' ;
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-userlogin',
  templateUrl: './usersingup.component.html',
  styleUrls: ['./usersingup.component.css']
})
export class UsersingupComponent implements OnInit {
  user:string;
  password:string;

  constructor(private userservice: UsersService) { }

  ngOnInit() {
    this.user = 's';
    this.password = 's';
  }

  singup(){
    this.userservice.singup(this.user, this.password).subscribe(data => {
      var result = data;
      });
  }
}
