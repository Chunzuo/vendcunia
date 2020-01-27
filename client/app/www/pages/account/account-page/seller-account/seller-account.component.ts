import { Component, OnInit } from '@angular/core';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-seller-account',
  templateUrl: './seller-account.component.html',
  styleUrls: ['./seller-account.component.scss']
})
export class SellerAccountComponent implements OnInit {

  constructor(private authService: AuthServiceApp) { }

  public user: any;

  ngOnInit() {
    this.user = {'member_ship': -1};
    this.authService.getUserData().subscribe(response => {
          const status = response['status'];
          if (status === 1) {
            this.user = response['data'][0];
          }
        });
  }

  updateUser() {
    this.authService.updateUser(this.user)
        .subscribe(response => {
          const status = response['status'];
          if (status === 1) {
          }
        });
  }

  clickAnchor() {
    if (this.user.member_ship !== 2) {
      this.user.member_ship = 2;
      this.updateUser();
    }
  }

  clickPremium() {
    if (this.user.member_ship !== 1) {
      this.user.member_ship = 1;
      this.updateUser();
    }
  }

  clickBasic() {
    if (this.user.member_ship !== 0) {
      this.user.member_ship = 0;
      this.updateUser();
    }
  }

}
