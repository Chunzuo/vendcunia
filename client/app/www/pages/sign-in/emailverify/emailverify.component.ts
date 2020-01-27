import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../../../theme/utils/app-validators';
import { AuthServiceApp } from '../../../../shared/services/auth/auth.service';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-emailverify',
  templateUrl: './emailverify.component.html',
  styleUrls: ['./emailverify.component.scss']
})
export class EmailverifyComponent implements OnInit {

  twofaForm: FormGroup;
  public loginToken : any;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private socket: Socket,
    private authService: AuthServiceApp
  ) { }

  ngOnInit() {
    this.twofaForm = this.formBuilder.group({
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public ontwofaFormSubmit(values: Object): void {
    if (this.twofaForm.valid) {
      const logintoken = sessionStorage.getItem('logintoken');
      const formdata = this.twofaForm.value;

      // Added by Jack (for debug) ...
      // console.log('login token : ' + logintoken);
      // console.log('formdata -> password : ' + formdata['password']);

      if (logintoken === formdata['password']) {
        this.snackBar.open('Congratulations!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        sessionStorage.setItem('two_fa', 'true');
        this.router.navigate(['']);
        return;
      }
      else {
        this.snackBar.open('2FA Failed!Please Sign In Again.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }
  }
}
