import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LocationService} from "../services/location.service";
import {ToastComponent} from "../common/toast/toast.component";
import {Location} from "../models/location";

@Component({
  selector: 'app-locationratio',
  templateUrl: './locationratio.component.html',
  styleUrls: ['./locationratio.component.css']
})
export class LocationRatioComponent implements OnInit {
  @Input() location: Location;
  private sub: any;
  private id: string;
  private ratio_data: any;

  is_loading = true;

  constructor(private route: ActivatedRoute
    , private location_service: LocationService
    , public toast: ToastComponent) {
  }

  ngOnInit() {
    this.sub = this.route.params.flatMap(
      params => {
        this.id = params['id'];
        this.is_loading = true;
        console.log('params:', this.id);
        return this.location_service.get_location(this.id);
      }
    ).flatMap(
      location => {
        this.location = location;
        return this.location_service.get_ratio(this.id);
      }
    ).subscribe(
      data => {
        console.log('ratio_data:', data);
        this.ratio_data = data;
        this.is_loading = false;
      }
      , err => console.log('ratio_data error:', err)
      , () => this.is_loading = false
    );
  }

}
