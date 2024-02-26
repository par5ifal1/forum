import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "../models/user";

@Injectable()
export class UserService{
  baseUrl = "http://localhost:1234/user";
  isLogged:boolean = sessionStorage.getItem('token') != null;
  currentUser!:User | undefined;

  constructor(private http:HttpClient) {
  }

  login (username:string, password:string){
    return this.http.post(this.baseUrl + "/login",{
      username:username,
      password:password
    })
  }

  register (username:string, password:string, email:string){
    return this.http.post(this.baseUrl + "/new",{
      username:username,
      password:password,
      email: email
    })
  }

  getUser (){
    return this.http.get(this.baseUrl + "/session")
  }

  logOut(){
    this.currentUser = undefined;
    this.isLogged = false;
    sessionStorage.clear();
  }
  updateUser(id:any,user:any){
    return this.http.put(this.baseUrl + "/update/" + id, user);
  }
  deleteUser(username:any){
    this.http.delete(this.baseUrl + "/delete/" + username).subscribe((value) => {
    });
  }
}
