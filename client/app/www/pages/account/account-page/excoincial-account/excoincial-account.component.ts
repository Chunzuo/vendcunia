import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../../../../theme/utils/app-validators';
@Component({
  selector: 'app-excoincial-account',
  templateUrl: './excoincial-account.component.html',
  styleUrls: ['./excoincial-account.component.scss']
})
export class ExcoincialAccountComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.registerForm = this.formBuilder.group({
      'first_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'last_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') });
  }

}
