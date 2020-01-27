import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule,
         MatButtonModule,
         MatButtonToggleModule,
         MatCardModule,
         MatCheckboxModule,
         MatChipsModule,
         MatDatepickerModule,
         MatDialogModule,
         MatExpansionModule,
         MatGridListModule,
         MatIconModule,
         MatInputModule,
         MatListModule,
         MatMenuModule,
         MatNativeDateModule,
         MatPaginatorModule,
         MatProgressBarModule,
         MatProgressSpinnerModule,
         MatRadioModule,
         MatRippleModule,
         MatSelectModule,
         MatSidenavModule,
         MatSliderModule,
         MatSlideToggleModule,
         MatSnackBarModule,
         MatSortModule,
         MatTableModule,
         MatTabsModule,
         MatToolbarModule,
         MatTooltipModule,
         MatFormFieldModule,
         MatStepperModule } from '@angular/material';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};

import { PipesModule } from '../theme/pipes/pipes.module';
import { RatingComponent } from './components/rating/rating.component';
import { ControlsComponent } from './components/controls/controls.component';
import { MainCarouselComponent } from './components/main-carousel/main-carousel.component';
import { BrandsCarouselComponent } from './components/brands-carousel/brands-carousel.component';
import { ProductsCarouselComponent } from './components/products-carousel/products-carousel.component';
import { ProductDialogComponent } from './components/products-carousel/product-dialog/product-dialog.component';
import { BannersComponent } from './components/banners/banners.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChatAcceptDialogComponent } from './components/chat-accept-dialog/chat-accept-dialog.component';
import { FeedbackDialogComponent } from '../www/pages/account/activity/feedback-dialog/feedback-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileSelectDirective } from 'ng2-file-upload';
import { EventsCarouselComponent } from './components/events-carousel/events-carousel.component';
import { PicksCarouselComponent } from './components/picks-carousel/picks-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    PipesModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,
    SwiperModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    PipesModule,
    MatFormFieldModule,
    RatingComponent,
    ControlsComponent,
    MainCarouselComponent,
    BrandsCarouselComponent,
    ProductsCarouselComponent,
    ProductDialogComponent,
    BannersComponent,
    CategoryListComponent,
    NotFoundComponent,
    FeaturedComponent,
    EventsCarouselComponent,
    PicksCarouselComponent
  ],
  declarations: [
    RatingComponent,
    ControlsComponent,
    MainCarouselComponent,
    BrandsCarouselComponent,
    ProductsCarouselComponent,
    ProductDialogComponent,
    BannersComponent,
    CategoryListComponent,
    NotFoundComponent,
    ChatAcceptDialogComponent,
    FeedbackDialogComponent,
    FeaturedComponent,
    EventsCarouselComponent,
    PicksCarouselComponent
  ],
  entryComponents: [
    ProductDialogComponent,
    ChatAcceptDialogComponent,
    FeedbackDialogComponent
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ]
})
export class SharedModule { }
