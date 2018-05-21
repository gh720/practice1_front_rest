import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LocationService} from "../services/location.service";
import {ToastComponent} from "../common/toast/toast.component";

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

  constructor(private route: ActivatedRoute
    , private location_service: LocationService
    , public toast: ToastComponent) {
  }

  ngOnInit() {
    this.sub = this.route.params.flatMap(
      params => {
        this.id = params['id'];
        console.log('params:', this.id);
        return this.location_service.get_ratio(this.id);
      }
    ).subscribe(
      data => {
        console.log('ratio_data:', data);
        this.ratio_data = data
      }
      , err => console.log('ratio_data error:', err)
    );
  }

}
