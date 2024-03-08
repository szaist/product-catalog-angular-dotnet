import { Injectable } from '@angular/core';
import { Product } from "../../Models/Entities/product.entity";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AddProductRequest } from "../../Models/Requests/addProduct.request";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) {
  }

  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`https://localhost:7280/api/products/${productId}`);
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("https://localhost:7280/api/products")

  }

  addProduct(product: AddProductRequest): Observable<Product> {
    return this.httpClient.post<Product>("https://localhost:7280/api/products", product)
  }

  deleteProduct(productId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:7280/api/products/${productId}`)
  }

  updateProduct(productId: number, product: Product): Observable<void> {
    return this.httpClient.put<void>(`https://localhost:7280/api/products/${productId}`, product)
  }

}
