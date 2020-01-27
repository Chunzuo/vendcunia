import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { SellerHubService } from '../../../../../shared/services/seller-hub.service';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent implements OnInit {

  resultData: any;
  content: string;
  constructor(public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private sellerHubService: SellerHubService,
    private authService: AuthServiceApp) { }

  ngOnInit() {
    this.resultData = {
      content: '',
      rating: 0
    };
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {

  }
}
