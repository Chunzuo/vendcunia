import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login-v2';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private socket: Socket,
    public socialAuthService: AuthService,
    private authService: AuthServiceApp) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'first_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'last_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') });
  }

  public onRegisterFormSubmit(values: Object): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value)
        .subscribe(response => {
          const status = response['success'];
          if (status === 1) {
            this.snackBar.open('You registered successfully! Please verify your Email.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/verify']);
          } else if (status === -2) {
            this.snackBar.open('Email address already exists!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else {
            this.snackBar.open('Register failed!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        })
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
          console.log(response);
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

            console.log(response['data'][0]['email']);

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

}
