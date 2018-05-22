import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RestError} from "./resterror";

// import { LoadingComponent } from './loading/loading.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
  , exports: [
    FormsModule
    , BrowserModule
    , ReactiveFormsModule
    , HttpClientModule
  ]
  , declarations: []
  , providers: [RestError]
})
export class common_module_c {
}
