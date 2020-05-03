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

  product: Product
  edit: boolean = false

  constructor(private httpClient:HttpClient) { }

  public getProducts(pageNum: number, pageSize: number) {
    let username = 'carlo'
    let password = '1234'

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) }).set("pageNum", pageNum.toString()).set("pageSize", pageSize.toString());

    return this.httpClient.get<Product[]>('http://localhost:8080/api/v1/products', {headers});
  }
  
  public createProduct(product) {
    let username = 'carlo'
    let password = '1234'

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.httpClient.post<Product>("http://localhost:8080/api/v1/products", product, {headers});
  }

  public editProduct(product) {
    let username = 'carlo'
    let password = '1234'
    let id = product.id
    product.id = null

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.httpClient.put<Product>("http://localhost:8080/api/v1/products/" + id, product, {headers});
  }
}
