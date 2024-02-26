import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {LoadingService} from "./loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ]
})
export class AppComponent implements OnInit{

  displayLoadingScreen = false;

  constructor(private router: Router, private loading:LoadingService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((routerEvent) => {
      if(routerEvent instanceof NavigationStart){
        this.displayLoadingScreen = true;
      }
    });
    this.loading.getData().subscribe((val) => {
      this.displayLoadingScreen = val;
    })
  }

}
