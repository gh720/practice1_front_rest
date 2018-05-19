import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AuthService} from "./services/auth.service";
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {RegisterComponent} from './register/register.component';
import {StatusComponent} from './status/status.component';
import {LoginRedirectService} from "./services/login-redirect.service";
import {EnsureAuthService} from "./services/ensure-auth.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent, canActivate: [LoginRedirectService]},
      {path: 'register', component: RegisterComponent, canActivate: [LoginRedirectService]},
      {path: 'status', component: StatusComponent}
    ]),
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
  ],
  providers: [AuthService, LoginRedirectService, EnsureAuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
