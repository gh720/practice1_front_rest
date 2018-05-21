import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() message = {body: '', type: ''};

  set_message(body, type, time = 3000) {
    this.message.body = body;
    this.message.type = type;
    setTimeout(() => {
      this.message.body = '';
    }, time);
  }


  constructor() {
  }

  ngOnInit() {
  }

}
