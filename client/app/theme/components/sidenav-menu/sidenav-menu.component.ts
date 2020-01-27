import { Component, OnInit, Input } from '@angular/core';
import { SidenavMenuService } from './sidenav-menu.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { SidenavMenu } from './sidenav-menu.model';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  providers: [ SidenavMenuService ]
})
export class SidenavMenuComponent implements OnInit {

  @Input('menuItems') menuItems;
  @Input('menuParentId') menuParentId;
  parentMenu: Array<any>;

  constructor(
    private sidenavMenuService: SidenavMenuService,
    private productService: ProductService
  ) {
    // this.productService.getCategoryList(-1).subscribe(response => {
    //   const menuItems = [];
    //   response.forEach((item) => {
    //     const id = item['id'] ;
    //     const title = item['name'];
    //     const routerLink = item['has_sub_menu'] === 1 ? null : 'products/' + item.id;
    //     const href = null;
    //     const target = null;
    //     const hasSubMenu = item['has_sub_menu'] === 1 ? true : false;
    //     const parentId = item['parent_id'];
    //     menuItems.push(new SidenavMenu(id, title, routerLink, href, target, hasSubMenu, parentId));
    //   });
    //   this.menuItems = menuItems;
    //   console.log(this.menuItems);
    // });
  }

  ngOnInit() {
    if (this.menuItems == null) {
      this.productService.getCategoryList(-1).subscribe(response => {
        const items = [];
        response.forEach(item => {
          items.push(new SidenavMenu(
            item['id'],
            item['name'],
            item['has_sub_menu'] === 1 ? null : 'products/' + item.id,
            null,
            null,
            item['has_sub_menu'] === 1 ? true : false,
            item['parent_id']));
        });
        this.parentMenu = items.filter(item => item.parentId === this.menuParentId);
      });
    } else {
      this.parentMenu = this.menuItems.filter(item => item.parentId === this.menuParentId);
    }
  }

  onClick(menuId) {
    // this.sidenavMenuService.toggleMenuItem(menuId);
    // this.sidenavMenuService.closeOtherSubMenus(this.menuItems, menuId);
  }
}
