import {Component, OnInit} from '@angular/core';
import {Visit} from "../models/visit";
import {Location} from "../models/location";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationService} from "../services/location.service";
import {ToastComponent} from "../common/toast/toast.component";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  is_loading: boolean = true;
  is_editing: boolean = false;
  locations: Location[] = [];

  location_form: FormGroup;

  country = new FormControl('', [
    Validators.required
  ]);

  city = new FormControl('', [
    Validators.required
  ]);

  name = new FormControl('', [
    Validators.required
  ]);

  description = new FormControl('', [
    Validators.required
  ]);


  constructor(private auth: AuthService
    , private location_service: LocationService
    , private form_builder: FormBuilder
    , public toast: ToastComponent
    , private router: Router) {
  }

  add_location() {
    console.log("saving location:", this.location_form.value);

    this.location_service.add_location(this.location_form.value)
      .flatMap(
        result => {
          console.log('flatMap:');
          this.toast.set_message('Visit information added!', 'success');
          return this.location_service.get_locations();
        }
      )
      .subscribe(
        data => this.locations = data
        , err => console.log('add_visit:', err)
      );
  }

  display_ratio(location: Location) {
    this.router.navigate(['/location_ratio'])
  }


  ngOnInit() {
    this.location_form = this.form_builder.group({
      country: this.country
      , city: this.city
      , name: this.name
      , description: this.description
    });
    this.location_service.get_locations().subscribe(
      data => this.locations = data
      , error => console.log("failed to initialize locations:", error)
      , () => this.is_loading = false
    )

  }


}
