import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-templates',
  templateUrl: './list-templates.component.html',
  styleUrls: ['./list-templates.component.scss']
})
export class ListTemplatesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  createTemplate() {
    this.router.navigateByUrl('/create-product');
  }

}
