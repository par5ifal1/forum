import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthenticationGuard} from "./authentication.guard";
import {LoginComponent} from "./components/login/login.component";
import {ChatComponent} from "./components/chat/chat.component";
import {TopicComponent} from "./components/topic/topic.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {UserSettingsComponent} from "./components/user-settings/user-settings.component";
import {UserResolveService} from "./user-resolve.service";
import {SingleTopicComponent} from "./components/single-topic/single-topic.component";


const routes:Routes = [{
  path: "", canActivateChild:[AuthenticationGuard], children:[
    { path:"login", component: LoginComponent },
    { path:"", component: ChatComponent, resolve: { user: UserResolveService }},
    { path:"topic", component: TopicComponent},
    { path:"topic/:id", component: SingleTopicComponent, resolve: { user: UserResolveService }},
    { path:"register", component: RegistrationComponent},
    { path:"settings", component:UserSettingsComponent, resolve: { user: UserResolveService }},
    { path:"**", redirectTo: '/login'}
  ]
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
