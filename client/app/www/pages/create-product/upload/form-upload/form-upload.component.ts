import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { AppConfig } from '../../../../../config/app.config';
import { CreateProductService } from '../../create-product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  thumbnailImagePath: string;
  thumbImages = [];
  current_index = 0;

  constructor(
    private productService: ProductService,
    public snackBar: MatSnackBar,
    private createProductService: CreateProductService,
    private activatedRoute: ActivatedRoute
  ) {
    }

  ngOnInit() {
    let paramId;
    this.activatedRoute.params.subscribe(params => {
      paramId = params['templateId'];
    });
    this.createProductService.uploadFiles = this.thumbImages;
    if (paramId != null) {
      this.getImages(paramId);
    } else {
      this.thumbnailImagePath = AppConfig.endpoints.ws + '/products/default.png';
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.productService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.thumbnailImagePath = event.body.toString();
        this.thumbImages.push(this.thumbnailImagePath);
        this.createProductService.uploadFiles = this.thumbImages;
        this.current_index++;
        this.snackBar.open('File is completely uploaded!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });

    this.selectedFiles = undefined;
  }

  removeImage(index) {
    this.thumbImages.splice(index, 1);
    this.current_index--;
    this.createProductService.uploadFiles = this.thumbImages;
    if (this.thumbImages.length < 1) {
      this.thumbnailImagePath = AppConfig.endpoints.ws + '/products/default.png';
    }
  }

  private getImages(productId) {
    const thisObj = this;
    this.productService.getImages(productId).subscribe(response => {
      if (response[0].images != null) {
        const images = response[0].images.split(',');
        thisObj.thumbnailImagePath = images[0];
        thisObj.thumbImages = images;
        thisObj.current_index = images.length;
        this.createProductService.uploadFiles = this.thumbImages;
      } else {
        thisObj.thumbnailImagePath = AppConfig.endpoints.ws + '/products/default.png';
      }
    });
  }
}
