import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import {UserService} from "./backOperations/user.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {RequestInterceptor} from "./request.interceptor";
import {TopicComponent} from "./components/topic/topic.component";
import {LoginComponent} from "./components/login/login.component";
import {ChatComponent} from "./components/chat/chat.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {MessagingService} from "./messaging.service";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {UserSettingsComponent} from "./components/user-settings/user-settings.component";
import {ConfirmPassValidator} from "./confirm-pass.validator";
import {UserResolveService} from "./user-resolve.service";
import {LoadingService} from "./loading.service";
import {TopicService} from "./backOperations/topic.service";
import {SingleTopicComponent} from "./components/single-topic/single-topic.component";
import {CommentService} from "./backOperations/comment.service";

@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    ChatComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    UserSettingsComponent,
    SingleTopicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MessagingService, UserService, ConfirmPassValidator, TopicService, CommentService, {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi:true},
    UserResolveService, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
