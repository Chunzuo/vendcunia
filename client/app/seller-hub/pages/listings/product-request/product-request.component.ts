import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: ['./product-request.component.scss']
})
export class ProductRequestComponent implements OnInit {

  positionOptions: string[] = [
  ];
  positionOptions1: string[] = [
  ];
  positionOption_searchlist: string[] = [
  ]
  pages: string[] = [
    '10',
    '20',
    '50',
    '100'
  ]
  displayedColumns = ['Record', 'id', 'name', 'progress', 'color'];
  constructor() { }

  ngOnInit() {
  }

}
