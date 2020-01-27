import { Component, OnInit } from '@angular/core';
import { MarketingService } from './marketing.service';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit {
  
  constructor(
    private marketingService: MarketingService
  ) { }

  ngOnInit() {
    
  }

}
