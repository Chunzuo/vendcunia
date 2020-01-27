import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-chat-accept-dialog',
  templateUrl: './chat-accept-dialog.component.html',
  styleUrls: ['./chat-accept-dialog.component.scss']
})
export class ChatAcceptDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChatAcceptDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onRejectClick(): void {
    this.dialogRef.close();
  }

}
