import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-activity-dialog-watchlist',
  templateUrl: './activity-dialog-watchlist.component.html',
  styleUrls: ['./activity-dialog-watchlist.component.scss']
})
export class ActivityDialogWatchlistComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ActivityDialogWatchlistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
