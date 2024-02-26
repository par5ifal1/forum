import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {UserService} from "../../backOperations/user.service";
import {Router} from "@angular/router";
import {LoadingService} from "../../loading.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  username:string = "";
  password:string = "";
  email:string = "";

  constructor(private userService: UserService, private router:Router, private loading: LoadingService) {
  }

  onSubmit(form:NgForm){
    this.userService.register(this.username, this.password, this.email).subscribe((res:any) => {
      this.router.navigate(['/','login']);
    },(error) => {
      alert("Registration failed");
    })
    form.reset();
  }

  ngOnInit(): void {
    this.loading.sendData(false);
  }
}
