import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

  username = 'carlo'
  password = '1234'

  constructor(private httpClient:HttpClient) { }

  public getProducts(pageNum: number, pageSize: number, active: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) }).set("pageNum", pageNum.toString()).set("pageSize", pageSize.toString());

    let params = null
    
    if (active === 'active') {
      params = new HttpParams().set('active', 'true')
    }
    else if (active === 'inactive') {
      params = new HttpParams().set('active', 'false')
    }   

    return this.httpClient.get<Product[]>('http://localhost:8080/api/v1/products', {params: params, headers: headers});
  }

  public getProductById(productId: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) }); 

    return this.httpClient.get<Product[]>('http://localhost:8080/api/v1/products/' + productId, {headers});
  }
  
  public createProduct(product) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });

    return this.httpClient.post<Product>("http://localhost:8080/api/v1/products", product, {headers});
  }

  public editProduct(product) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });

    let id = product.id
    product.id = null

    return this.httpClient.put<Product>("http://localhost:8080/api/v1/products/" + id, product, {headers});
  }

  public inactivateProduct(id) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });

    let body = JSON.parse('[{"op":"replace","path":"/active","value":false}]')
    
    return this.httpClient.patch<Product>("http://localhost:8080/api/v1/products/" + id, body, {headers});
  }
  
}
