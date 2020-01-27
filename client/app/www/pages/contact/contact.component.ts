import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../../theme/utils/app-validators';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(public formBuilder: FormBuilder, 
              private authService: AuthServiceApp, 
              public snackBar: MatSnackBar,
              public router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn();
    this.authService.isTwoFA();
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  public onContactFormSubmit(values: Object): void {
    if (this.contactForm.valid) {
      console.log(values);
      this.authService.contact(values).subscribe(response => {
        if (response['success'] == 1){
          this.snackBar.open('Email is sent to Support Team!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/']);
        }
      });
    }
  }

}
