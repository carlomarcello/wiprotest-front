import { Component, OnInit } from '@angular/core';
import { HttpClientService, Product } from '../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  pageNum: number = 1;
  pageSize: number = 4;
  products: Product[];

  constructor(private router: Router, private httpClientService:HttpClientService) { }

  ngOnInit() {
    this.search()
  }

  handleSuccessfulResponse(response) {
    this.products = response;
  }

  search() {
    this.httpClientService.getProducts(this.pageNum - 1, this.pageSize).subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  edit(product: Product) {    
    this.httpClientService.product = product;
    this.httpClientService.edit = true;
    this.router.navigate(['addproduct']);
  }

}
