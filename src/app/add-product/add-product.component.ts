import { Component, OnInit } from '@angular/core';
import { Product, HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product(null, "", 0.0, new Date(), true);

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
  }

  createProduct(): void {
    this.httpClientService.createProduct(this.product)
        .subscribe( data => {
          alert("Product created successfully.");
        });
  };

}
