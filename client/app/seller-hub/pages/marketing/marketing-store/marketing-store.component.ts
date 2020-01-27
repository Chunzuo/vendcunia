import { Component, OnInit } from '@angular/core';
import { MarketingService } from '../marketing.service';

@Component({
  selector: 'app-marketing-store',
  templateUrl: './marketing-store.component.html',
  styleUrls: ['./marketing-store.component.scss']
})
export class MarketingStoreComponent implements OnInit {

  constructor(
    private marketingService: MarketingService
  ) { }

  ngOnInit() {
    this.marketingService.sidebarVisible = false;
  }

  ngOnDestroy() {
    this.marketingService.sidebarVisible = true;
  }
}
