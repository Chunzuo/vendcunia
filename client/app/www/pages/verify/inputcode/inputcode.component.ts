import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../../../theme/utils/app-validators';
import { AuthServiceApp } from '../../../../shared/services/auth/auth.service';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-inputcode',
  templateUrl: './inputcode.component.html',
  styleUrls: ['./inputcode.component.scss']
})
export class InputcodeComponent implements OnInit {

  inputcodeForm : FormGroup;

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private socket: Socket,
    private authService: AuthServiceApp) { }

  ngOnInit() {
    this.inputcodeForm = this.formBuilder.group({
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public onInputcodeFormSubmit(values : Object) : void {
    if (this.inputcodeForm.valid){
      this.authService.verifyEmail(this.inputcodeForm.value).subscribe(response=>{
        console.log(this.inputcodeForm.value);
        if(response['status'] == 1){
          this.snackBar.open('Your Account is Active Now!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/sign-in']);
          return;
        }
        else {
          this.snackBar.open(response['msg'], '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          return;
        }
      });
    }
  }

}
