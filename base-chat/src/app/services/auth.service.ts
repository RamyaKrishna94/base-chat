import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User} from '../models/user.module';

@Injectable()
export class AuthService {
  private user : Observable<firebase.User>;
  private authState : any;

  constructor(private afAuth : AngularFireAuth,private router : Router,
              private afdb : AngularFireDatabase) { 
                this.user = afAuth.authState;
              }

   get currentUserId() : string{
      return this.afAuth !== null ? this.authState.uid : '';
  }

  login(email : string, password : string){
      return this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then((resolve) => {
        const status = 'online';
        this.router.navigate(['chat']);
      })
  }

  signUp(email : string,password : string, displayName : string){
      return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
            .then((user) => {
              this.authState = user;
              const status = 'online';
              this.sendUserData(email,displayName,status);
            }).catch(error => console.log(error));
  }
  sendUserData(email:string,displayName:string,status : string) : void{
    const path = `users/${this.currentUserId}`;
    const data = {
      email : email,
      displayName : displayName,
      status : status
    };
    
    this.afdb.object(path).update(data)
    .catch(error => console.log(error));
  }

  sendUserStatus(status : string) : void{
    const path = `/users`;
    const data = {
      status : status
    };
  }

  authUser(){
    return this.user;
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
