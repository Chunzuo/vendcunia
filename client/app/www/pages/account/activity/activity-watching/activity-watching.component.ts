import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivityDialogWatchlistComponent } from '../activity-dialog-watchlist/activity-dialog-watchlist.component';

@Component({
  selector: 'app-activity-watching',
  templateUrl: './activity-watching.component.html',
  styleUrls: ['./activity-watching.component.scss']
})
export class ActivityWatchingComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  create_list(): void {
    const dialogRef = this.dialog.open(ActivityDialogWatchlistComponent, {
        width: '880px',
        data: { name: 'Select your featured listing',
                content: `Search for and select listings you want to promote.
                          The listings you select yourself will appear in your seller
                          profile and in the feed that a buyer sees on their home page.` }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
  }

}
