import { Component, OnInit ,Input} from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-picks-carousel',
  templateUrl: './picks-carousel.component.html',
  styleUrls: ['./picks-carousel.component.scss']
})
export class PicksCarouselComponent{
  @Input('picks') picks: Array<any> = [];

  public config: SwiperConfigInterface = { };

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.config = {
      slidesPerView: 3,
      spaceBetween: 16,         
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,        
      loop: true,
      preloadImages: false,
      lazy: true,     
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide",
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        },
        960: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 5,
        },
        1500: {
          slidesPerView: 6,
        }
      }
    }
  }

}
