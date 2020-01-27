import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Data, AppService } from '../../../app.service';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;

  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  countries = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              public appService: AppService,
              private formBuilder: FormBuilder,
              private authService: AuthServiceApp,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.authService.isLoggedIn();
    this.authService.isTwoFA();

    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: '',
      company: '',
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: '',
      zip: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [this.deliveryMethods[0], Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      /*cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      cvv: ['', Validators.required]*/
    });

    const productId = sessionStorage.getItem('buy_product_id');
    const quantity = sessionStorage.getItem('buy_product_quantity');
    const price = sessionStorage.getItem('buy_product_price');
    if (productId === null || !productId ||
        quantity === null || !quantity ||
        price === null || !price) {
      this.router.navigate(['/']);
      return;
    }

    this.grandTotal = parseInt(quantity, 10) * parseFloat(price);
  }

  public placeOrder() {
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);

    const productId = sessionStorage.getItem('buy_product_id');
    const quantity = sessionStorage.getItem('buy_product_quantity');
    const price = sessionStorage.getItem('buy_product_price');
    if (!productId || !quantity || !price) {
      return;
    }

    sessionStorage.removeItem('buy_product_id');
    sessionStorage.removeItem('buy_product_quantity');
    sessionStorage.removeItem('buy_product_price');

    const orderData = {
      user_id: this.authService.getUserId(),
      product_id: productId,
      quantity: quantity,
      ordering_price: price,
      first_name: this.billingForm.controls.firstName.value,
      last_name: this.billingForm.controls.lastName.value,
      middle_name: this.billingForm.controls.middleName.value,
      company: this.billingForm.controls.company.value,
      email: this.billingForm.controls.email.value,
      phone: this.billingForm.controls.phone.value,
      country: this.billingForm.controls.country.value,
      city: this.billingForm.controls.city.value,
      province: this.billingForm.controls.state.value,
      zip_code: this.billingForm.controls.zip.value,
      address: this.billingForm.controls.address.value,
      delivery_method: this.deliveryForm.controls.deliveryMethod.value
    };

    // order status is follows :
    // 1 => created, 2 => cancelled, 3 => awaiting payment, 4 => paid,
    // 5 => awaiting shipment, 6 => shipping in progress, 7 => shipped, 8 => shipped and paid, 9 => completed
    this.productService.placeOrder(orderData).subscribe((response) => {
      if (response['status'] === 1) {
        this.snackBar.open('Order has been successfully placed!', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.horizontalStepper.next();
        this.verticalStepper.next();
      } else if (response['status'] === 0) {
        this.snackBar.open('Invalid parameters!', '×',
              { panelClass: 'error', verticalPosition: 'top', duration: 30000 });
      } else if (response['status'] === -1) {
        this.snackBar.open('Database query error occured!', '×',
              { panelClass: 'error', verticalPosition: 'top', duration: 30000 });
      }
    });
  }

}
