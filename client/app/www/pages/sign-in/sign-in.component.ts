import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';
import { SocketIOAdapter } from '../../../shared/utils/socketio-adapter';
import { Socket } from 'ng-socket-io';
import { ProductService } from '../../../shared/services/product/product.service';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login-v2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public router: Router,
              public snackBar: MatSnackBar,
              private socket: Socket,
              private authService: AuthServiceApp,
              public socialAuthService: AuthService,
              private productService: ProductService) {
    this.InitializeSocketListeners();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public onLoginFormSubmit(values: Object): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(response => {
          const status = response['success'];
          const user = response['user'];
          if (status === 1) {
            sessionStorage.setItem('user_id', user.user_id);
            sessionStorage.setItem('email', user.email);
            sessionStorage.setItem('first_name', user.first_name);
            sessionStorage.setItem('token', user.token);
            sessionStorage.setItem('last_name', user.last_name);
            sessionStorage.setItem('user_role', user.user_role);
            sessionStorage.setItem('user_role_id', user.user_role);
            sessionStorage.setItem('avatar', user.avatar);
            sessionStorage.setItem('google_id', user.google_id);
            sessionStorage.setItem('two_fa', 'false');

            this.authService.getloginToken(user.email).subscribe(response => {
              if (response['success'] == 1) {
                sessionStorage.setItem('logintoken', response['logintoken']);

                // Added by Jack (to get login token and try to login) ...
                console.log('login token : ' + response['logintoken']);
              }
              else {
                this.snackBar.open('2FA Error!Please try again!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
                return;
              }
            });

            this.socket.emit('login', this.authService.getEmail());

            this.snackBar.open('You signed in successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/sign-in/emailverify']);

            setTimeout(() => {
              this.authService.firstName = user.first_name;
            }, 200);
          } else if (status === -1) {
            this.snackBar.open('Please input email and password!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else if (status === -2) {
            this.snackBar.open('Email address is incorrect!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else if (status === -3) {
            this.snackBar.open('Your account is blocked!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else if (status === -4) {
            this.snackBar.open('Password is incorrect!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else {
            this.snackBar.open('Sign In failed!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        });
    }
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.authService.googleLogin(userData.idToken).subscribe(response => {
          if (response['data'][0]['email'] != -1) {
            sessionStorage.setItem('user_id', response['data'][0]['id']);
            sessionStorage.setItem('email', response['data'][0]['email']);
            sessionStorage.setItem('token', response['data'][0]['token']);
            sessionStorage.setItem('first_name', response['data'][0]['first_name']);
            sessionStorage.setItem('last_name', response['data'][0]['last_name']);
            sessionStorage.setItem('user_role', response['data'][0]['user_role']);
            sessionStorage.setItem('user_role_id', response['data'][0]['user_role']);
            sessionStorage.setItem('avatar', response['data'][0]['avatar']);
            sessionStorage.setItem('google_id', response['data'][0]['google_id']);
            sessionStorage.setItem('two_fa', 'false');

            this.authService.getloginToken(response['data'][0]['email']).subscribe(response => {
              if (response['success'] == 1){
                sessionStorage.setItem('logintoken', response['logintoken']);
              }
              else {
                this.snackBar.open('2FA Error!Please try again!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
                return;
              }
            });

            this.socket.emit('login', this.authService.getEmail());

            this.snackBar.open('You signed in successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/sign-in/emailverify']);

            setTimeout(() => {
              this.authService.firstName = response['data'][0]['first_name'];
            }, 200);
          }
          else {
            this.snackBar.open('Sign In failed!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        });
      }
    );
  }

  public InitializeSocketListeners(): void {
    this.socket.on('loginResponse', (socketId) => {
      this.socket.emit('getCompareCount', this.authService.getUserId());
      this.socket.emit('getWishListCount', this.authService.getUserId());
      this.socket.emit('getCartCount', this.authService.getUserId());
      this.socket.emit('getCartList', this.authService.getUserId());
    });

    this.socket.on('compareChanged', (compareCount) => {
      sessionStorage.setItem('compare_count', compareCount);
    });
    this.socket.on('wishListChanged', (wishListCount) => {
      sessionStorage.setItem('wish_list_count', wishListCount);
    });

    this.socket.on('cartChanged', (cartCount) => {
      sessionStorage.setItem('cart_count', cartCount);
    });

    this.socket.on('getCartListResponse', (carts) => {
      this.productService.setCartList(carts);
      let cartTotalPrice = 0;
      carts.forEach(cart => {
        cartTotalPrice += cart['price'];
      });

      sessionStorage.setItem('cart_total_price', cartTotalPrice.toString());
    });
  }

}
