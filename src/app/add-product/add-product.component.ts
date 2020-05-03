import { Component, OnInit } from '@angular/core';
import { Product, HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product(null, "", 0.0, new Date(), true);
  action: string = "Novo"

  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit() {
    if (this.httpClientService.edit) {
      this.product = this.httpClientService.product
      this.httpClientService.edit = false
      this.action = "Editar"
    } else {
      this.product = new Product(null, "", 0.0, new Date(), true);
      this.action = "Novo"
    }
  }

  createProduct(): void {
    if (this.product.id) {      
      this.httpClientService.editProduct(this.product).subscribe( 
        data => {
          alert("Produto atualizado com sucesso.");
        });           
    } else {
      this.httpClientService.createProduct(this.product).subscribe( 
        data => {
          alert("Produto criado com sucesso.");
        });      
    }
    this.router.navigate([''])
  };

}
