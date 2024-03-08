import { Component, EventEmitter, inject, Input, Output, TemplateRef } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Product } from "../../Models/Entities/product.entity";
import { ProductService } from "../../Services/Product/product.service";
import { Subject, takeUntil } from "rxjs";
import { createWebpackLoggingCallback } from "@angular-devkit/build-angular/src/tools/webpack/utils/stats";

@Component({
  selector: 'app-product-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './product-delete-modal.component.html',
})
export class ProductDeleteModalComponent {
  destroy: Subject<void> = new Subject<void>()

  @Input() productId!: number

  @Output() refreshProducts = new EventEmitter<void>()

  private modalService = inject(NgbModal)

  constructor(private readonly productService: ProductService) {
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content).result.then(
      (result) => {
        if (result == 'delete') {
          this.deleteProduct()
        }
      }
    )
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productId).pipe(takeUntil(this.destroy)).subscribe(() => {
      this.refreshProducts.emit()
    })
  }
}
