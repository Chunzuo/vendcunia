import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-bussiness-pass-dlg',
  templateUrl: './bussiness-pass-dlg.component.html',
  styleUrls: ['./bussiness-pass-dlg.component.scss']
})
export class BussinessPassDlgComponent implements OnInit {

  old_password: string;
  new_password: string;
  verify_password: string;

  constructor(public dialogRef: MatDialogRef<BussinessPassDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthServiceApp, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOk() {
    this.authService.checkPassword(this.old_password,this.new_password,this.verify_password)
      .subscribe(response => {
        const status = response['status'];
        if (status === 1) {
            this.snackBar.open('You have just updated your password!', '×',
            { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.dialogRef.close();
        } else {
          this.snackBar.open('You must input correct your password', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      });
  }
}
