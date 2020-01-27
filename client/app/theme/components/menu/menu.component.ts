import { Component, OnInit} from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public categoryList = [];
  public subCategoryList = [];
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getCategoryList();
  }

  openMegaMenu() {
    const pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if (el.children.length > 0) {
          if (el.children[0].classList.contains('mega-menu')) {
            el.classList.add('mega-menu-pane');
          }
        }
    });
  }

  private getCategoryList() {
    this.productService.getCategoryList(0).subscribe(response => {
      this.categoryList = response;
    });
  }

  public getSubCategoryList(parentId) {
    this.productService.getCategoryList(parentId).subscribe(response => {
      this.subCategoryList = response;
      for (let i = 0; i < this.subCategoryList.length; i++) {
        const each = this.subCategoryList[i];
        this.getDoubleSubCategoryList(each.id, this.subCategoryList[i], function(results) {
        });
      }
      this.openMegaMenu();
    });
  }

  public getDoubleSubCategoryList(parentId, parentObj, callback) {
    this.productService.getCategoryList(parentId).subscribe(response => {
      parentObj.children = response;
      return callback(parentObj);
    });
  }

}
