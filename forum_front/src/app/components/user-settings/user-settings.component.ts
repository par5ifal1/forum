import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmPassValidator} from "../../confirm-pass.validator";
import {UserService} from "../../backOperations/user.service";
import {User} from "../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../../loading.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  @Input() value: any;
  updateForm!:FormGroup;
  user!:User | undefined;
  constructor(private confirmPassValidator:ConfirmPassValidator, private formBuilder: FormBuilder,
              private userService:UserService, private route: ActivatedRoute, private loading: LoadingService,
              private router:Router) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((val:any) => {
      val.user.subscribe((val:any) => {
        this.user = val;
        this.updateForm = this.formBuilder.group({
          username: [val.username, [Validators.required]],
          email: [val.email, [Validators.required]],
          password: ['', [Validators.required]],
          confirm: ['', [Validators.required]]
        },{validators: [this.confirmPassValidator.confirmPass]})
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
  onSubmit(){
  let password = this.updateForm.value.password;
  let updatedUser:any
    if(password == ''){
      updatedUser = {
        id: this.user?.id,
        username: this.updateForm.value.username,
        email: this.updateForm.value.email,
      }
    }else {
      updatedUser = {
        id: this.user?.id,
        username: this.updateForm.value.username,
        email: this.updateForm.value.email,
        password: password,
      }
    }
    this.userService.updateUser(this.user?.id, updatedUser).subscribe((val) => {
      this.userService.logOut();
      this.router.navigate(['/login']);
    });
  }
  onDelete(){
    this.userService.deleteUser(this.user?.username);
    this.userService.logOut();
    this.router.navigate(['/login']);
  }
}
