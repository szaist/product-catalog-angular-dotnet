import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ProductService } from "../../Services/Product/product.service";
import { Product } from "../../Models/Entities/product.entity";
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  destroy: Subject<void> = new Subject<void>()
  form!: FormGroup<UpdateProductForm>
  product!: Product

  @Input() productId!: number

  constructor(private readonly productService: ProductService, private readonly router: Router) {
    this.form = new FormGroup<UpdateProductForm>({
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

  ngOnInit(): void {
    this.getProduct()
  }

  async onSubmit() {
    if (this.form.valid) {
      const request: Product = { ...this.form.value, id: this.productId } as Product

      this.editProduct(request)
    }
  }

  editProduct(product: Product) {
    this.productService.updateProduct(this.productId, product).pipe(takeUntil(this.destroy)).subscribe(async () => {

      await this.router.navigate([''])
    })

  }

  getProduct() {
    try {
      this.productService.getProduct(this.productId).pipe(takeUntil(this.destroy)).subscribe((obj: Product) => {
        this.product = obj

        this.setFormValues(obj)
      })
    } catch (error: any) {
      console.error('ERR: Error during product fetching.')
    }
  }

  setFormValues(product: Product) {
    this.form.setValue({
      name: product.name,
      price: product.price,
      description: product.description,
    })
  }
}

type UpdateProductForm = {
  name: FormControl<string>
  price: FormControl<number>
  description: FormControl<string>
}
