import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketing-body',
  templateUrl: './marketing-body.component.html',
  styleUrls: ['./marketing-body.component.scss']
})
export class MarketingBodyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  click_getStated(param) {
    this.router.navigate(['sellerhub/marketing/store']);
  }

}
