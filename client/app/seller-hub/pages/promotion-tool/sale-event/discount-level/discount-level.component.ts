import { Component, OnInit, Input} from '@angular/core';
import { SaleEventService } from '../sale-event.service';

@Component({
  selector: 'app-discount-level',
  templateUrl: './discount-level.component.html',
  styleUrls: ['./discount-level.component.scss']
})
export class DiscountLevelComponent implements OnInit {

  @Input() index: number;
  @Input() sel1: string;
  @Input() sel2: string;

  public item1: string;
  public item2: string;

  optionValue: string;
  discountSelectControlName: string;
  saleSelectControlName: string;

  constructor(private saleEventService: SaleEventService) {
  }

  ngOnInit() {
    this.item1 = this.sel1;
    this.item2 = this.sel2;

    this.optionValue = 'discount_sale_percent_' + (this.index + 1).toString();
    this.discountSelectControlName = 'discount_select_' + (this.index + 1).toString();
    this.saleSelectControlName = 'sale_select_' + (this.index + 1).toString();
  }

  public removeLevel(): void {
    this.saleEventService._array.splice(this.index, 1);
  }

}
