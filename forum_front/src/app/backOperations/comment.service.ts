import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Topic} from "../models/topic";
import {UserComment} from "../models/UserComment";

@Injectable()
export class CommentService{
  baseUrl = "http://localhost:1234/comment";
  isLogged:boolean = sessionStorage.getItem('token') != null;

  constructor(private http:HttpClient) {
  }

  createComment (comment:{
    user: User,
    text: String,
    date: String
  }){
    return this.http.post(this.baseUrl + "/new",comment);
  }

}
