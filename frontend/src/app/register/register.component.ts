import {Component} from '@angular/core';
import {User} from "../models/user";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();

  constructor(private router:Router, private auth: AuthService) {
  }

  onRegister(): void {
    this.auth.register(this.user)
      .subscribe((user) => {
          localStorage.setItem('token', user.token);
          this.router.navigateByUrl('/status');
          console.log(user);
        }
        , (err) => {
          console.log(err);
        });
  }
}
