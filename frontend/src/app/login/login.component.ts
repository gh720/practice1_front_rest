import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastComponent} from "../common/toast/toast.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_form: FormGroup;

  username = new FormControl('', [
    Validators.required, Validators.minLength(3), Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required, Validators.minLength(3)
  ]);

  // user: User = new User();

  constructor(private router: Router, private auth: AuthService, public toast: ToastComponent
    , private form_builder: FormBuilder) {
  }

  on_login(): void {
    this.auth.login(this.login_form.value).subscribe(
      (result) => {
        console.log(result);
        this.router.navigate(['/visits']);
      }, (error) => {
        console.log(error);
        this.toast.set_message('Login failed: ' + error.toString(), 'danger')
      })
  }

  ngOnInit() {
    // if (this.auth.logged_in) {
    //   this.router.navigate(['/']);
    // }

    this.login_form = this.form_builder.group({
      username: this.username,
      password: this.password
    });
  }


}
