import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Product } from "../../../app.models";
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner5.jpg' }
  ];

  public brands = [];
  public banners = [];
  public events = [];
  public picks = [];
  public featuredProducts: Array<Product> = [];
  public onSaleProducts: Array<Product> = [];
  public topRatedProducts: Array<Product> = [];
  public newArrivalsProducts: Array<Product> = [];


  constructor(public appService:AppService, private productService: ProductService) { }

  ngOnInit() {
    this.getBanners();
    this.getProducts("featured");
    this.getBrands();
    this.getEvents();
    this.getPicks();
  }

  public onLinkClick(e){
    this.getProducts(e.tab.textLabel.toLowerCase());
  }

  public getProducts(type){
    if(type == "featured"){
      this.productService.getByType(1).subscribe(response=>{
        this.featuredProducts = response;        
      })
    }
    if(type == "on sale"){
      this.productService.getByType(2).subscribe(response=>{
        this.onSaleProducts = response;        
      })      
    }
    if(type == "top rated"){
      this.productService.getByType(3).subscribe(response=>{
        this.topRatedProducts = response;
      })       
    }
    if(type == "new arrivals"){
      this.productService.getByType(4).subscribe(response=>{
        this.newArrivalsProducts = response;
      })
    }

  }

  public getBanners(){
    this.appService.getBanners().subscribe(data=>{
      this.banners = data;
    })
  }

  public getBrands(){
    this.brands = this.appService.getBrands();
  }

  public getEvents(){
    this.events = this.appService.getEvents();
  }

  public getPicks(){
    this.picks = this.appService.getPicks();
  }
}
