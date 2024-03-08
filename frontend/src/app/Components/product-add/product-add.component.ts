import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";
import { ProductService } from "../../Services/Product/product.service";
import { Subject, takeUntil } from "rxjs";
import { AddProductRequest } from "../../Models/Requests/addProduct.request";
import { Router } from "@angular/router";


@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  destroy: Subject<void> = new Subject<void>()
  form: FormGroup<AddProductForm>

  constructor(private readonly productService: ProductService, private readonly router: Router) {
    this.form = new FormGroup<AddProductForm>({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      price: new FormControl(0, {
        nonNullable: true, validators: [
          Validators.required,
        ]
      }),
      description: new FormControl('', { nonNullable: true })
    })
  }

  get Name() {
    return this.form.get('name')
  }

  get Price() {
    return this.form.get('price')
  }

  onSubmit() {
    if (this.form.valid) {
      const request: AddProductRequest = this.form.value as AddProductRequest

      this.addProduct(request)
    }
  }

  addProduct(product: AddProductRequest) {
    this.productService.addProduct(product).pipe(takeUntil(this.destroy)).subscribe(async () => {

      await this.router.navigate([''])
    })

  }
}

interface AddProductForm {
  name: FormControl<string>
  price: FormControl<number>
  description: FormControl<string>
}
