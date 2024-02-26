import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { Injectable } from "@angular/core";
import { Message } from "./models/message";

@Injectable()
export class MessagingService{
  stompClient: any;
  msg: Message[] = []
  nextMessage = false;
  constructor() {
    this.connect();
  }

  connect(){
    const socket = new SockJS("http://localhost:1234/mw");
    this.stompClient = Stomp.over(socket);
    const that = this;
    this.stompClient.connect({},function(frame: any) {
      that.stompClient.subscribe('/allchat', (message: any) => {
        if(message.body){
          that.msg.push(JSON.parse(message.body))
        }
        that.nextMessage = false;
      });
    });
  }

  sendMessage(message: Message) {
    this.nextMessage = true;
    this.stompClient.send('/app/send/allchat' , {}, JSON.stringify(message));
  }
}
