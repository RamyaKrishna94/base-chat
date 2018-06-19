import { Component, OnInit,ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
@ViewChild('scroller') private feedContainer : ElementRef;
  constructor() { }

  ngOnInit() {
  }

  //nativeElemet.scrollTop sets or gets number of pixels that an elements content is scrolled vertically
  //native-element.scrollHeight is readonly gets height of content, including overflow
  scrollToBottom() : void{
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }


  ngAfterViewChecked(){
    this.scrollToBottom();
  }
}
