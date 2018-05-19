import {Component} from '@angular/core';
import {User} from "../models/user";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();

  constructor(private auth: AuthService) {
  }

  onRegister(): void {
    this.auth.register(this.user)
      .subscribe((user) => {
          console.log(user);
        }
        , (err) => {
          console.log(err);
        });
  }
}
