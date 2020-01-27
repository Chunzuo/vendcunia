import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { itemIdsValidator, dateRangeValidator } from '../../../../theme/utils/app-validators';

import { PromotionService } from '../promotion.service';

@Component({
  selector: 'app-volume-pricing',
  templateUrl: './volume-pricing.component.html',
  styleUrls: ['./volume-pricing.component.scss']
})
export class VolumePricingComponent implements OnInit {

  volumePricingForm: FormGroup;
  private isCancelClicked: boolean;

  positionOptions = [
    { id: '', value: 'Start now' },
    { id: '18:30', value: '6:30pm PDT' },
    { id: '19:00', value: '7:00pm PDT' },
    { id: '19:30', value: '7:30pm PDT' },
    { id: '20:00', value: '8:00pm PDT' }
  ];

  constructor(public formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private promotionService: PromotionService) {
    this.isCancelClicked = false;
  }

  ngOnInit() {
    this.volumePricingForm = this.formBuilder.group({
      offer_name: ['', Validators.compose([Validators.required])],
      two_items_percent: ['', Validators.compose([Validators.required])],
      three_items_percent: ['', Validators.compose([Validators.required])],
      four_items_percent: ['', Validators.compose([Validators.required])],
      check_item_id: [false],
      item_ids: ['', Validators.compose([Validators.required, itemIdsValidator])],
      from_date: ['', Validators.compose([Validators.required])],
      from_time: ['', Validators.compose([Validators.required])],
      to_date: ['', Validators.compose([Validators.required])],
      to_time: ['', Validators.compose([Validators.required])]
    }, { validator: dateRangeValidator('from_date', 'to_date') });
  }

  onVolumePricingFormSubmit(values: Object): void {
    if (this.isCancelClicked === true) {
      this.isCancelClicked = false;
      return;
    }
    console.log('values : ' + JSON.stringify(values));
    if (this.volumePricingForm.valid) {
      const pricingInfo = this.volumePricingForm.value;
      this.promotionService.launchVolumePricing(pricingInfo)
        .subscribe(response => {
          if (response.status === 1) {
            this.snackBar.open('Succeed to launch volume pricing!', '×',
                  { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          } else if (response.status === 0) {
            this.snackBar.open('Failed to launch volume pricing! Invalid parameters', '×',
                  { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else if (response.status === -1) {
            this.snackBar.open('Failed to launch volume pricing! Database query error!', '×',
                  { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else if (response.status === -2) {
            this.snackBar.open('Failed to launch volume pricing! Invalid product ids!', '×',
                  { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else {
            this.snackBar.open('Failed to launch volume pricing!', '×',
                  { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
      });
    }
  }

  cancel(): void {
    this.isCancelClicked = true;

    this.volumePricingForm.controls.offer_name.setValue('');
    this.volumePricingForm.controls.two_items_percent.setValue('');
    this.volumePricingForm.controls.three_items_percent.setValue('');
    this.volumePricingForm.controls.four_items_percent.setValue('');
    this.volumePricingForm.controls.check_item_id.setValue(false);
    this.volumePricingForm.controls.item_ids.setValue('');
    this.volumePricingForm.controls.from_date.setValue('');
    this.volumePricingForm.controls.from_time.setValue('');
    this.volumePricingForm.controls.to_date.setValue('');
    this.volumePricingForm.controls.to_time.setValue('');
  }

}
