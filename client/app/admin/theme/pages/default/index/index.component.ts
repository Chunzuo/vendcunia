import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../shared/utils/helpers';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit, AfterViewInit {

  constructor() {
    console.log('admin -> index.component.ts file, constructor()');
  }

  ngOnInit() {
    console.log('admin -> index.component.ts file, ngOnInit() function');
  }

  ngAfterViewInit() {
  }

}
