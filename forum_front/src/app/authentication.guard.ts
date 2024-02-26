import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {LoadingService} from "./loading.service";

@Injectable({
  providedIn:"root"
})
export class AuthenticationGuard implements CanActivateChild{
  constructor(private router:Router, private loading: LoadingService) {
  }

  canActivateChild(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if((state.url == "/login" || state.url == "/register") && sessionStorage.getItem("token")){
      return this.router.parseUrl("");
    }
    if(state.url == "/login" || state.url == "/register"){
      return true;
    }

    if(!sessionStorage.getItem("token")){
      this.loading.sendData(false);
      return this.router.parseUrl("/login");
    }else {
      setTimeout(() => {
        return true
      }, 2000)
      return true;
    }
  }

}
