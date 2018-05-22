import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {AuthService} from "../services/auth.service";
import {ToastComponent} from "../common/toast/toast.component";
import {UserService} from "../services/user.service";
import {RestError} from "../common/resterror";

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  is_loading = true;

  constructor(private auth: AuthService
    , public toast: ToastComponent
    , private user_service: UserService
    , private rest_error: RestError) {
  }

  ngOnInit() {
    console.log("getting user data...");
    this.get_user();
  }

  get_user() {
    console.log("get_user: current_user_id:", this.auth.current_user_id);

    this.user_service.get_user(this.auth.current_user_id).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => {
        console.log("get_user: ", this.user);
        this.is_loading = false;
      }
    )
  }

  save(user: User) {
    this.user_service.save(user).subscribe(
      res => this.toast.set_message('account settings saved!', 'success'),
      error => {
        let msg = this.rest_error.get_error_string(error);
        this.toast.set_message('Cannot save: ' + msg, 'danger');
        console.log(error);
      }
    );
  }


}
