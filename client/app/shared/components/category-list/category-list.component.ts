import { Component, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Category } from '../../../app.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements DoCheck {

  @Input() categories;
  @Input() categoryParentId;
  @Output() change: EventEmitter<any> = new EventEmitter();
  mainCategories;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
   }

  public ngDoCheck() {
    if (this.categories && !this.mainCategories) {
      this.mainCategories = this.categories.filter(category => category.parent_id === this.categoryParentId);
    }
  }

  public stopClickPropagate(event: any) {
    if (window.innerWidth < 960) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  public changeCategory(id) {
    // this.change.emit(event);
    this.router.navigateByUrl('/products/' + id);
  }
}
