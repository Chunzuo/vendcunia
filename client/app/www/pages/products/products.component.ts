import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationCancel, NavigationEnd, NavigationStart } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../../../shared/components/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../../app.service';
import { Product, Category } from '../../../app.models';
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen = true;
  private sub: any;
  public viewType = 'grid';
  public viewCol = 25;
  public counts = [12, 24, 36];
  public count: any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort: any;
  public products: Array<Product> = [];
  public categories: Category[];
  public brands = [];
  public priceFrom = 750;
  public priceTo = 1599;
  public colors = ['#5C6BC0', '#66BB6A', '#EF5350', '#BA68C8', '#FF4081', '#9575CD', '#90CAF9',
  '#B2DFDB', '#DCE775', '#FFD740', '#00E676', '#FBC02D', '#FF7043', '#F5F5F5', '#000000'];
  public sizes = ['S', 'M', 'L', 'XL', '2XL', '32', '36', '38', '46', '52', '13.3\'', '15.4\'', '17\'', '21\'', '23.4\''];
  public page: any;
  /**
   * Added by Michael
   */
  private categoryId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    public dialog: MatDialog,
    private router: Router,
    private productService: ProductService) {
      /*this.router.events
        .filter(e => e instanceof NavigationStart)
        .subscribe(e => {
          this.categoryId = e['url'].split('/')[2];
          this.getProducts();
        });*/
  }

  ngOnInit() {
    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.categoryId = params['id'];
      this.getCategories();
      this.getBrands();
      this.getProducts();
    });
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    }
  }

  public getProducts() {
    if (this.categoryId == null) {
      this.productService.getList().subscribe(response => {
        this.products = response;
      });
    } else {
      this.productService.getProductsByCategory(this.categoryId).subscribe(response => {
        this.products = response;
      });
    }
  }

  public getCategories() {
    if (this.appService.Data.categories.length === 0) {
      this.productService.getCategoryList(-1).subscribe(data => {
        const categories = [];
        data.map((item) => {
          categories.push(new Category(item['id'], item['name'], item['has_sub_category'], item['parent_id']));
        });
        this.categories = categories;
        this.appService.Data.categories = categories;
      });
    } else {
      this.categories = this.appService.Data.categories;
    }
  }

  public getBrands() {
    this.brands = this.appService.getBrands();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count) {
    this.count = count;
    // this.getAllProducts();
  }

  public changeSorting(sort) {
    this.sort = sort;
  }

  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.router.navigate(['/products', response.id, response.name]);
      }
    });
  }

  public onPageChanged(event) {
      this.page = event;
      // this.getAllProducts();
      window.scrollTo(0, 0);
  }

  public onChangeCategory(event) {
    if (event.target) {
      this.router.navigate(['/products', event.target.innerText.toLowerCase()]);
    }
  }

}
