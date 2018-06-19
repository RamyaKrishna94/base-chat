import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private authService : AuthService,private router : Router) { }

  ngOnInit() {
  }

  login(data){
    this.authService.login(data.email,data.password);
  }

}
