import {Component, OnInit} from '@angular/core';
import {LocationService} from "../services/location.service";
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {AuthService} from "../services/auth.service";
import {ToastComponent} from "../common/toast/toast.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  is_loading = false;
  users: User[]=[];

  constructor(private auth: AuthService
    , private user_service: UserService
    , public toast: ToastComponent) {
  }

  can_edit(id):boolean {
    return this.auth.current_user_id===id;
  }

  ngOnInit() {
    this.user_service.get_users().subscribe(
      data => this.users = data
      , error => console.log("failed to initialize users:", error)
      , () => this.is_loading = false
    )

  }

}
