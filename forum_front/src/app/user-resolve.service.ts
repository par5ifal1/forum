import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserService} from "./backOperations/user.service";
import {Observable, Subscriber, of, delay} from "rxjs";

@Injectable()
export class UserResolveService implements Resolve<any>{
  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.userService.getUser()
    return of(this.userService.getUser()).pipe();
  }

}
