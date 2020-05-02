import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Product {
  constructor(
    public id: String,
    public description: String,
    public value: Number,
    public creationDate: Date,
    public active: Boolean
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) { }

  public getProducts() {
    const headers = new HttpHeaders().set("pageNum", "0").set("pageSize", "10");

    return this.httpClient.get<Product[]>('http://localhost:8080/api/v1/products', {headers});
  }
  
  public createProduct(product) {
    return this.httpClient.post<Product>("http://localhost:8080/api/v1/products", product);
  }
}
