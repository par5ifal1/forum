import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Topic} from "../models/topic";
import {UserComment} from "../models/UserComment";

@Injectable()
export class TopicService{
  baseUrl = "http://localhost:1234/topic";
  isLogged:boolean = sessionStorage.getItem('token') != null;
  currentUser!:User | undefined;

  constructor(private http:HttpClient) {
  }

  createTopic (topic:{
    label: String,
    description: String,
    comments: Comment[]
  }){
    return this.http.post(this.baseUrl + "/new",topic);
  }

  getAllTopics(){
    return this.http.get(this.baseUrl + "/all");
  }

  getTopic(id:any){
    return this.http.get(this.baseUrl + "/" + id);
  }

  deleteTopic(id:number){
    this.http.delete(this.baseUrl + "/delete/" + id).subscribe((value) => {
    });
  }

  addComment(comment:UserComment, id:number){
    return this.http.post(this.baseUrl + "/" + id + "/comment", comment);
  }

}
