import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-create-listings',
  templateUrl: './create-listings.component.html',
  styleUrls: ['./create-listings.component.scss']
})
export class CreateListingsComponent implements OnInit {
  showCategories = false;
  drafts: any;

  constructor(
    private router: Router,
    private productService: ProductService,
    private authService: AuthServiceApp
  ) {
  }
  ngOnInit() {
    this.getDrafts();
  }

  private getDrafts() {
    this.productService.getDrafts(this.authService.getUserId()).subscribe(response => {
      this.drafts = response;
    });
  }

  public onBrowseCategories(): void {
    this.showCategories = !this.showCategories;
  }

  click_template() {
    this.router.navigate(['create-product']);
  }

  public onClickComplete(templateId) {
    this.router.navigate(['create-product', templateId]);
  }

  public onClickDelete(templateId) {
    this.productService.deleteTemplate(templateId).subscribe(response => {
      this.getDrafts();
    });
  }
}
