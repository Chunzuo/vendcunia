import { Component, OnInit } from '@angular/core';
import { MarketingService } from '../marketing.service';

@Component({
  selector: 'app-marketing-sidebar',
  templateUrl: './listings-sidebar.component.html',
  styleUrls: ['./listings-sidebar.component.scss']
})
export class MarketingSidebarComponent implements OnInit {
  public isVisible: boolean;
  constructor(
    private marketingService: MarketingService
  ) {
    this.isVisible = true;
  }

  ngOnInit() {
    this.isVisible = this.marketingService.sidebarVisible;
  }

}
