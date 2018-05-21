import {Component} from '@angular/core';
import {User} from "../models/user";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();

  register_form: FormGroup;

  username = new FormControl('', [
    Validators.required, Validators.minLength(3), Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required, Validators.minLength(3)
  ]);

  email = new FormControl('', []);
  first_name = new FormControl('', []);
  last_name = new FormControl('', []);
  gender = new FormControl('', []);
  birth_date = new FormControl('', []);
  country = new FormControl('', []);


  constructor(private router: Router
    , private auth: AuthService
    , private form_builder: FormBuilder) {
  }

  on_register(): void {
    let value = this.register_form.value;
    for (let key of Object.keys(value)) {
      if (value[key]=="") {
        console.log('deleting:', key);
        delete value[key];
      }
    }
    console.log(value);
    this.auth.register(value).subscribe(
      (result) => {
        localStorage.setItem('token', result.token);
        this.router.navigateByUrl('/');
        console.log(result);
      }
      , (err) => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.register_form = this.form_builder.group({
      username: this.username,
      password: this.password,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      gender: this.gender,
      birth_date: this.birth_date,
      country: this.country,

    });
  }

}
