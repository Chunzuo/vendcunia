import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductZoomComponent } from './product/product-zoom/product-zoom.component';

// import { NgChatModule } from 'ng-chat';
// import { HttpModule } from '@angular/http';
// import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

//const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };

export const routes = [
  { path: '', component: ProductsComponent, pathMatch: 'full' },
  { path: ':id', component: ProductsComponent },
  { path: ':id/:name', component: ProductComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule,
    // HttpModule,//socket by U
    // NgChatModule,
    //SocketIoModule.forRoot(config) 
  ],
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductZoomComponent
  ],
  entryComponents: [
    ProductZoomComponent
  ]
})
export class ProductsModule { }
