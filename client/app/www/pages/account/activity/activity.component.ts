import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  public sidenavOpen:boolean = true;

  constructor() { }

  ngOnInit() {
    if (window.innerWidth < 960){
      this.sidenavOpen = false;
    };
  }

}
