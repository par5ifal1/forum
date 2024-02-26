import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../backOperations/user.service";
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  user!: User | undefined;
  session = sessionStorage.getItem("token");
  isLogged!:boolean;

  constructor(private userService: UserService,
              private router:Router) {

  }
  returnStateOfLogin(){
    return this.userService.isLogged;
  }

  ngOnInit() {
    let logining = new Observable((sub) =>{
        sub.next(sessionStorage.getItem("token"));
      })

    logining.subscribe((res) => {
        if (res != null && res != "") {
          this.userService.getUser()
          this.user = this.userService.currentUser
        }
    })
    this.router.events.subscribe((routerEvent) => {
      this.isLogged = this.returnStateOfLogin();
    });
  }

  logOut(){
    this.userService.logOut();
    this.router.navigate(["/","login"])
  }
}
