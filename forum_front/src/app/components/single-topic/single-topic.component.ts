import { Component, OnInit } from '@angular/core';
import {LoadingService} from "../../loading.service";
import {UserService} from "../../backOperations/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Topic} from "../../models/topic";
import {TopicService} from "../../backOperations/topic.service";
import {User} from "../../models/user";
import {CommentService} from "../../backOperations/comment.service";

@Component({
  selector: 'app-single-topic',
  templateUrl: './single-topic.component.html',
  styleUrls: ['./single-topic.component.css']
})
export class SingleTopicComponent implements OnInit {

  topic!:Topic;
  user!:User;
  input = '';

  constructor(private loading: LoadingService, private userService:UserService, private route: ActivatedRoute,
              private topicService:TopicService, private router:Router, private commentSerice:CommentService) {

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


    let id = this.route.snapshot.paramMap.get('id');
    this.topicService.getTopic(id).subscribe((val:any) => {
      this.topic = val;
      this.loading.sendData(false);
    });

  }

  getCurrentDate(){
    let date = new Date()
    return date.getHours().toString() + ":" + date.getMinutes() + " " + date.getDate() + "." + (date.getMonth() + 1)
  }

  addComment(){
    if(this.input) {
      this.commentSerice.createComment({
        user: this.user,
        text: this.input,
        date: this.getCurrentDate()
      }).subscribe((res: any) => {
        this.topicService.addComment(res, this.topic.id).subscribe(() => {
        },);
      })
      this.input = "";
    }
  }
}
