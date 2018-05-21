import {Component, OnInit} from '@angular/core';
import {Location} from "../models/location";
import {VisitService} from "../services/visit.service";
import {Visit} from "../models/visit";
import {Observable} from "rxjs/Rx";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastComponent} from "../common/toast/toast.component";
import {LocationService} from "../services/location.service";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  is_loading: boolean = true;
  is_editing: boolean = false;
  locations: Location[] = [];
  visits: Visit[] = [];
  visit: Visit;

  visit_form: FormGroup;

  location = new FormControl('', [
    Validators.required
  ]);

  rating = new FormControl('', [
    Validators.required, Validators.min(1), Validators.max(10)
  ]);

  constructor(private location_service: LocationService
    , private visit_service: VisitService
    , public toast: ToastComponent
    , private form_builder: FormBuilder
    , private auth: AuthService) {
  }

  add_visit() {
    console.log("saving visit:", this.visit_form.value);
    let value = this.visit_form.value;
    let visit=new Visit();
    visit.location=value.location;
    visit.ratio=value.rating;
    console.log({ 'value':  value, 'visit': visit });

    this.visit_service.add_visit(visit)
      .flatMap(
        result => {
          console.log('flatMap:');
          this.toast.set_message('Visit information added!', 'success');
          return this.visit_service.get_visits();
        }
      )
      .subscribe(
        data => this.visits = data
        , err => console.log('add_visit:', err)
      );
  }


  ngOnInit() {

    this.visit_form = this.form_builder.group({
      location: this.location
      , rating: this.rating
    });
    Observable.forkJoin(this.location_service.get_locations()
      , this.visit_service.get_visits()).subscribe(([locations, visits]) => {
        this.locations = locations;
        this.visits = visits;
      }
      , error => console.log("failed to initialize visit:", error)
      , () => this.is_loading = false
    );
  }
}
