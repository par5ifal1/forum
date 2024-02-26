import {Component, OnInit} from '@angular/core';
import {UserService} from "../../backOperations/user.service";
import {MessagingService} from "../../messaging.service";
import {Message} from "../../models/message";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../../loading.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  title = 'ForumProjectFront';
  input = '';
  msg = this.messageService.msg;
  user!:any;
  getStateOfMessage(){
    return this.messageService.nextMessage;
  }
  constructor(private messageService: MessagingService, private userService:UserService, private route: ActivatedRoute,
              private loading: LoadingService, private router:Router) {
  }

  sendMessage(){
    let date = new Date()

    if(this.input){
      this.messageService.sendMessage(<Message>{
        text: this.input,
        date: this.getCurrentDate(),
        user: this.user
      })
      this.input = '';
    }
  }

  getCurrentDate(){
    let date = new Date()
    return date.getHours().toString() + ":" + date.getMinutes() + "  " + date.getDate() + "." + (date.getMonth() + 1)
  }

  ngOnInit(): void {
      this.route.data.subscribe((val:any) => {
        val.user.subscribe((val:any) => {
          this.user = val;
          this.loading.sendData(false);
        },() => {
          this.userService.logOut();
          this.router.navigate(['/','login']);
        });
      }, () => {
        this.userService.logOut();
        this.router.navigate(['/','login']);
      })

  }

}
