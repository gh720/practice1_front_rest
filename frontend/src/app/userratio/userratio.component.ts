import {Component, Input, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {ToastComponent} from "../common/toast/toast.component";

@Component({
  selector: 'app-userratio',
  templateUrl: './userratio.component.html',
  styleUrls: ['./userratio.component.css']
})
export class UserRatioComponent implements OnInit {
  @Input() user: User;
  private sub: any;
  private id: string;
  private ratio_data: any;

  is_loading = true;

  constructor(private route: ActivatedRoute
    , private user_service: UserService
    , public toast: ToastComponent) {
  }

  ngOnInit() {
    this.sub = this.route.params.flatMap(
      params => {
        this.id = params['id'];
        this.is_loading=true;
        console.log('params:', this.id);
        return this.user_service.get_user(this.id);
      }
    ).flatMap(
      user => {
        this.user = user;
        return this.user_service.get_ratio(this.id);
      }
    ).subscribe(
      data => {
        console.log('ratio_data:', data);
        this.ratio_data = data;
        this.is_loading=false;

      }
      , err => console.log('ratio_data error:', err)
      , () => this.is_loading = false
    );
  }

}
