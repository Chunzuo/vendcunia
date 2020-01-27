import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listings-scheduled',
  templateUrl: './listings-scheduled.component.html',
  styleUrls: ['./listings-scheduled.component.scss']
})
export class ListingsScheduledComponent implements OnInit {

  isCollapsed = false;
  positionOptions: string[] = [
    'Item title',
    'Item ID'
  ];
  positionOptions1: string[] = [
    'All',
    'Starting within the next hour',
    'Starting today'
  ];
  positionOptions2: string[] = [
    'All',
    'Auction',
    'Fixed price',
    'Fixed price(GTC)'
  ];
  positionOptions3: string[] = [
    'Assign',
    'Remove'
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
  position5 = this.positionOptions5[0];

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
