import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.ensure_authenticated(token)
        .subscribe((user) => {
            console.log(user);
            if (user.status === 'success') {
              this.isLoggedIn = true;
            }
          }
          , (err) => {
            console.log(err);
          })
    }
  }

}
