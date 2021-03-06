import { Component, OnInit } from '@angular/core';
import { Observable } from '@firebase/util';
import * as firebase from 'firebase/app';
import {AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user : Observable<firebase.User>;
  userEmail:string;
  constructor(private authService : AuthService) { }

  ngOnInit() {
    (this.authService.authUser()).subscribe(user => {
      if(user){
        this.userEmail = user.email;
      }
    });
  }

  logout(){
    this.authService.logout();
  }

}
