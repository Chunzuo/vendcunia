import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listings-ended',
  templateUrl: './listings-ended.component.html',
  styleUrls: ['./listings-ended.component.scss']
})
export class ListingsEndedComponent implements OnInit {

  isCollapsed = false;
  positionOptions: string[] = [
    'Item title',
    'Item ID'
  ];
  positionOptions1: string[] = [
    'All',
    'Unsold and not relisted',
    'Relisted',
    'Not relisted',
    'Sold',
    'Unsold',
    'Unsold from multi-quantity listings',
    'Eligible for relist fee credit',
    'Eligible for second chance offer',
    'Cancelled',
    'Eligible for duplicate listings policy fee credit'

  ];
  positionOptions2: string[] = [
    'All',
    'Auction',
    'Fixed price',
    'Fixed price(GTC)'
  ];
  positionOptions3: string[] = [
    'Last 24 hours',
    'Last 31 days',
    'Today',
    'Yesterday',
    'All'
  ];
  positionOptions4: string[] = [
    'Single listing',
    'Multiple listings',
  ];
  positionOptions5: string[] = [
    'Add/Edit note',
    'Delete',
  ];
  position = this.positionOptions[0];
  position1 = this.positionOptions1[0];
  position2 = this.positionOptions2[0];
  position3 = this.positionOptions3[0];
  position4 = this.positionOptions4[0];
  position5 = this.positionOptions4[0];

  displayedColumns = ['Record', 'id', 'name', 'progress', 'color'];
  constructor() { }

  ngOnInit() {
  }
  SearchClick_Up() {
    this.isCollapsed = true;
    document.getElementById('search_up').style.display = 'none'
    document.getElementById('search_down').style.display = 'block';
  }
  SearchClick_Down() {
    this.isCollapsed = false;
    document.getElementById('search_up').style.display = 'block';
    document.getElementById('search_down').style.display = 'none';
  }
}

