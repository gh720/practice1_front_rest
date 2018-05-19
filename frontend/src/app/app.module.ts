import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AuthService} from "./services/auth.service";
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {RegisterComponent} from './register/register.component';
import { StatusComponent } from './status/status.component';

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
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'status', component: StatusComponent }
    ]),
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
