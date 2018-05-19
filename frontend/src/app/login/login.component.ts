import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  test: string = 'test!';

  user: User = new User()

  constructor(private auth: AuthService) {
  }

  onLogin(): void {
    this.auth.login(this.user)
      .subscribe((user) => {
        console.log(user)
      }, (error) => {
        console.log(error);
      })
  }

  ngOnInit() {

    // let sampleUser: any = {
    //   username: 'u2@test.local' as string,
    //   password: 'p2' as string
    // };
    // this.auth.register({username: sampleUser.username, password: sampleUser.password})
    //   .subscribe(
    //     (user) => {
    //       console.log(user)
    //     }, (error) => {
    //       console.log(error);
    //     }
    //   );
    //
    // this.auth.login({username: sampleUser.username, password: sampleUser.password}).subscribe(
    //   (user) => {
    //     console.log(user);
    //   }, (error) => {
    //     console.log(error);
    //   });

    // console.log(this.auth.test());
  }


}
