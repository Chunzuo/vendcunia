import { Component, OnInit, Input } from '@angular/core';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BussinessPassDlgComponent } from '../bussiness-pass-dlg/bussiness-pass-dlg.component';

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss']
})
export class BusinessInfoComponent implements OnInit {

  public user: any;
  avg: number;
  stars: Array<string>;
  @Input() ratingsCount: number;
  @Input() ratingsValue: number;
  @Input() direction: string;

  constructor(private authService: AuthServiceApp,
    private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.user = { 'password': '', 'email': '', 'phone_number': '', 'city': '',
        'address_sub': '', 'address': '', 'rating': 0, 'balance': ''
      };
    this.authService.getUserData()
      .subscribe(response => {
        const status = response['status'];
        if (status === 1) {
          this.user = response['data'][0];
          this.stars = ['star', 'star', 'star_border', 'star_border', 'star_border'];
        }
      });
  }

  change_password(): void {
    const dialogRef = this.dialog.open(BussinessPassDlgComponent, {
        width: '615px',
        height: '382px',
        data: { name: 'Account Password', content: 'You can update you password!' }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.user.password = result;
    });
  }
  updateUser() {
    this.authService.updateUser(this.user)
        .subscribe(response => {
          const status = response['status'];
          if (status === 1) {
            this.snackBar.open('You update your account Information!', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          } else {
            this.snackBar.open('failed!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        });
  }
}
