import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-codeless-coupon',
  templateUrl: './codeless-coupon.component.html',
  styleUrls: ['./codeless-coupon.component.scss']
})
export class CodelessCouponComponent implements OnInit {
  dateCtrl: FormControl;
  select_obj = 0;
  show_flag = 1;
  content_flag = true;
  offerFlag = 0;
  checkValue = false;
  constructor() {
    this.dateCtrl = new FormControl();
  }

  ngOnInit() {
  }
  radioClick(index) {
    this.show_flag = index;
  }
  setMode() {
    if (this.select_obj === 0) {
      this.content_flag = true;
    } else {
      this.content_flag = false;
    }
  }
  offer2Click(idx) {
    this.offerFlag = idx;
  }
  checkClick() {
    this.dateCtrl.disabled ? this.dateCtrl.enable() : this.dateCtrl.disable()
  }
}
