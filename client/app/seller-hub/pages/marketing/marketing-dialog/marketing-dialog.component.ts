import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-marketing-dialog',
  templateUrl: './marketing-dialog.component.html',
  styleUrls: ['./marketing-dialog.component.scss']
})
export class MarketingDialogComponent implements OnInit {

  search_val: string;

  constructor(public dialogRef: MatDialogRef<MarketingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
