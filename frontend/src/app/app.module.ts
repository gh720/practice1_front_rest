import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {common_module_c} from "./common/common.module";
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AuthService} from "./services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {RegisterComponent} from './register/register.component';
import {StatusComponent} from './status/status.component';
import {LoginRedirectService} from "./services/login-redirect.service";
import {EnsureAuthService} from "./services/ensure-auth.service";
import {LocationComponent} from './location/location.component';
import {UserComponent} from './user/user.component';
import {VisitComponent} from './visit/visit.component';
import {VisitService} from "./services/visit.service";
import {LocationService} from "./services/location.service";
import {UserService} from "./services/user.service";
import {token_interceptor_c} from "./services/token.interceptor";
import {LogoutComponent} from './logout/logout.component';
import {LocationRatioComponent} from './locationratio/locationratio.component';
import {UserRatioComponent} from './userratio/userratio.component';
import {UserEditComponent} from './useredit/useredit.component';
import {LoadingComponent} from "./common/loading/loading.component";
import {ToastComponent} from "./common/toast/toast.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  // {path: 'login', component: LoginComponent, canActivate: [LoginRedirectService]},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  // {path: 'register', component: RegisterComponent, canActivate: [LoginRedirectService]},
  {path: 'status', component: StatusComponent},
  {path: 'locations', component: LocationComponent},
  {path: 'users', component: UserComponent},
  {path: 'visits', component: VisitComponent},
  {path: 'location_ratio/:id', component: LocationRatioComponent},
  {path: 'user_ratio/:id', component: UserRatioComponent},
  {path: 'profile', component: UserEditComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StatusComponent,
    LocationComponent,
    UserComponent,
    VisitComponent,
    LogoutComponent,
    LocationRatioComponent,
    UserRatioComponent,
    UserEditComponent,
    LoadingComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule
    , HttpClientModule
    , FormsModule
    , common_module_c
    , RouterModule.forRoot(routes)
    , HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: token_interceptor_c,
      multi: true
    }
    , AuthService
    , LoginRedirectService
    , EnsureAuthService
    , VisitService
    , LocationService
    , UserService
    , ToastComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
