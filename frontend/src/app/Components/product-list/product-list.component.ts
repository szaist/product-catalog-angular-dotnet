import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { Product } from "../../Models/Entities/product.entity";
import { ProductService } from "../../Services/Product/product.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  destroy: Subject<void> = new Subject<void>()
  products: Product[] = []

  constructor(private readonly productService: ProductService) {

  }

  ngOnInit(): void {
    this.productSubscribe()
  }

  productSubscribe() {
    this.productService.getProducts().pipe(takeUntil(this.destroy)).subscribe((obj: Product[]) => {
      this.products = obj
    })
  }

}
