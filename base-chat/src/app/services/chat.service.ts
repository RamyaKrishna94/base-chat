import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../models/chat-message.model';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
@Injectable() 
export class ChatService {
  chatMessages : FirebaseListObservable<ChatMessage[]>;
  chatMessage : FirebaseListObservable<ChatMessage>;
  username : Observable<string>;
  user  :  firebase.User;
  arrayObjects : any[];

  constructor(private db : AngularFireDatabase,
              private auth : AngularFireAuth) { 
        this.auth.authState.subscribe(auth => {
          if(auth !== undefined && auth !== null){
              this.user = auth;
          }

          this.getUser().valueChanges().subscribe(a => {
              this.username = a['displayName'];
          });
        });
    }

    getUser(){
      const userId = this.user.uid;
      const path = `/users/${userId}`;
      return this.db.object(path);
    }

    getUsers (){
      const path = `/users`;
      return this.db.list(path);
    }

  sendMessage(msg : string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message : msg,
      timestamp : timestamp,
      username : this.username,
      email : email
    });
  }

  getMessages() : any {
  //  let list = this.db.list('/messages',ref => ref.limitToLast(15));
  // let list =  this.db.list(url, ref => ref.limitToLast(25).orderByKey());
    return this.db.list('/messages');
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1)+ '/' + 
                 now.getUTCDate(); 
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes()+ ':' +
                 now.getUTCSeconds();
   return (date + " "+ time );
  }
}
