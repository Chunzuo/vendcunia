import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MarketingDialogComponent } from '../marketing-dialog/marketing-dialog.component';
import { MarketingService } from '../marketing.service';

@Component({
  selector: 'app-marketing-storesel',
  templateUrl: './marketing-storesel.component.html',
  styleUrls: ['./marketing-storesel.component.scss']
})
export class MarketingStoreselComponent implements OnInit, OnDestroy {

  store_name: string;
  review_val: string;

  afuConfig = {
    uploadAPI: {
      url: 'http://192.168.1.109/vendcunia_api/products/upload'
    },
    multiple: true
  }

  constructor(public dialog: MatDialog,
              private marketingService: MarketingService) {
  }

  ngOnInit() {
    this.store_name = 'VendaStore';
    this.marketingService.sidebarVisible = false;
  }

  ngOnDestroy() {
    this.marketingService.sidebarVisible = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MarketingDialogComponent, {
        width: '880px',
        data: { name: 'Select your featured listing', 
          content: `Search for and select listings you want to promote. The listings you select yourself
            will appear in your seller profile and in the feed that a buyer sees on their home page.` }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
  }
}
