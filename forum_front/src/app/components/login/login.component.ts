import { Component, OnInit } from '@angular/core';
import {UserService} from "../../backOperations/user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadingService} from "../../loading.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = '';
  password:string = '';
  constructor(private userService:UserService, private router:Router, private loading: LoadingService) {

  }

  onSubmit(form: NgForm) {
    this.userService.login(this.username, this.password).subscribe(
      (res:any) =>{
        if(res){
          sessionStorage.setItem('token', res.sessionId);
          this.userService.getUser();
        }
        this.userService.isLogged = true;
        this.router.navigate(['/']);

      },(er) => {
        alert("Logining is failed");
      }
    );
    form.reset();
  }


  ngOnInit(): void {
    this.loading.sendData(false);
  }

  onRegister(){
    this.router.navigate(['/', 'register']);
  }

}
