import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from "../../Services/Product/product.service";
import { Subject, takeUntil } from "rxjs";
import { Product } from "../../Models/Entities/product.entity";
import { ActivatedRoute } from "@angular/router";
import { ProductEditComponent } from "../../Components/product-edit/product-edit.component";

@Component({
  selector: 'app-edit-product-page',
  standalone: true,
  imports: [
    ProductEditComponent
  ],
  templateUrl: './edit-product-page.component.html',
  styleUrl: './edit-product-page.component.css'
})
export class EditProductPageComponent implements OnInit {
  destroy: Subject<void> = new Subject()

  productId!: number

  product!: Product

  constructor(private readonly productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getIdFromRoute()

  }

  getIdFromRoute() {
    try {
      this.route.paramMap.pipe(takeUntil(this.destroy)).subscribe(params => {
        this.productId = parseInt(params.get('productId') ?? '-1')
      })

    } catch (error) {
      console.error('ERR: Invalid productId!')
    }
  }

}
