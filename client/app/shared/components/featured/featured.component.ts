import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input('featured') featured: Array<any> = [];

  constructor() { }

  ngOnInit() { }

  public getBanner(index){
    return this.featured[index];
  }

  public getBgImage(index){
    let bgImage = {
      'background-image': index != null ? "url(" + this.featured[index].image + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
    };
    return bgImage;
  } 

}
