import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service' ;
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  user:string;
  pass:string;

  constructor(private userservice: UsersService) { }

  ngOnInit() {
    this.user = 's';
    this.pass = 's';
  }

  loginuser(){
    this.userservice.login(this.user, this.pass).subscribe(data => {
      var result = data;
      });
  }
}
