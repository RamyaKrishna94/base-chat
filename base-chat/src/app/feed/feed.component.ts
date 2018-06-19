import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message.model';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed : FirebaseListObservable<ChatMessage[]>;
  constructor(private chat : ChatService) { }

  ngOnInit() {
   this.chat.getMessages().valueChanges().subscribe(res => {
     this.feed = res;
   });
  }

  ngOnChanges(){
    this.chat.getMessages().valueChanges().subscribe(res => {
      this.feed = res;
    });
      }
}
