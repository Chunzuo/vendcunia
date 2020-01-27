import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CreateProductComponent } from './create-product.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NgxUploaderModule } from 'ngx-uploader';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UploadFilesComponent } from './upload/upload-files/upload-files.component';
import { DetailsUploadComponent } from './upload/details-upload/details-upload.component';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { ListUploadComponent } from './upload/list-upload/list-upload.component';
import { DomesticFlatComponent } from './domestic-flat/domestic-flat.component';

export const routes = [
  { path: '', component: CreateProductComponent, pathMatch: 'full'},
  { path: ':templateId', component: CreateProductComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    AngularFileUploaderModule,
    FormsModule,
    NgxUploaderModule
  ],
  declarations: [
    CreateProductComponent,
    UploadFilesComponent,
    DetailsUploadComponent,
    FormUploadComponent,
    ListUploadComponent,
    DomesticFlatComponent
  ]
})
export class CreateProductModule { }
