import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { ProductAddComponent } from './product-add.component';
import { ProductService } from "../../Services/Product/product.service";
import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";


describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture<ProductAddComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddComponent, HttpClientTestingModule],
      providers: [ProductService, HttpClient]

    })
      .compileComponents();

    productService = TestBed.inject(ProductService)

    fixture = TestBed.createComponent(ProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form be invalid when fields are missing', () => {
    expect(component.form.invalid).toBeTruthy()
  });

  it('should be valid if the required fields are filled', () => {
    component.form.setValue({ name: 'Name', price: 10, description: '' })

    expect(component.form.valid).toBeTruthy()
  })
  
});
