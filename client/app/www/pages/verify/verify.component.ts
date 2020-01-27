import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  verifyForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private socket: Socket,
    private authService: AuthServiceApp) {
  }

  ngOnInit() {
    this.verifyForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])]
    });
  }

  public onVerifyFormSubmit(values: Object): void {
    this.snackBar.open('Your Email is already verified!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    // if (this.verifyForm.valid) {
    //   this.authService.isActive(this.verifyForm.value).subscribe(response => {
    //     const active = response['data'][0]['active'];
    //     if (active === 1) {
    //       this.snackBar.open('Your Email is already verified!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    //       return;
    //     } else {
    //       this.authService.sendCode(this.verifyForm.value).subscribe(response => {
    //         if (response['success'] === 1) {
    //           this.snackBar.open('Verification Code is sent to your Email!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    //           this.router.navigate(['/verify/inputcode']);
    //           return;
    //         } else {
    //           this.snackBar.open('Email server Error!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    //           return;
    //         }
    //       });
    //     }
    //   });
    // }
  }

}
