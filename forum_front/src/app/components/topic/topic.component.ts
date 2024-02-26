import { Component, OnInit } from '@angular/core';
import {LoadingService} from "../../loading.service";
import {TopicService} from "../../backOperations/topic.service";
import {Topic} from "../../models/topic";
import {NgForm} from "@angular/forms";
import {UserService} from "../../backOperations/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  label = "";
  description = "";
  topics!:Topic[];
  constructor(private loading: LoadingService, private topicService:TopicService, private userService:UserService,
              private router:Router) {

  }

  ngOnInit(): void {
    this.topicService.getAllTopics().subscribe((val:any) => {
      this.topics = val;
      this.loading.sendData(false);
    }, () => {
      this.userService.logOut();
      this.router.navigate(['/','login']);
    })
  }

  addTopic(form: NgForm){
    this.topicService.createTopic({
      label: this.label,
      description: this.description,
      comments: []
    }).subscribe(()=>{

    },() =>{
      console.log("Something went wrong!")
    })
    form.reset();
  }

}
