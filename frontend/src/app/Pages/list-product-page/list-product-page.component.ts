import { Component } from '@angular/core';
import { ProductListComponent } from "../../Components/product-list/product-list.component";

@Component({
  selector: 'app-list-product-page',
  standalone: true,
  imports: [
    ProductListComponent
  ],
  templateUrl: './list-product-page.component.html',
  styleUrl: './list-product-page.component.css'
})
export class ListProductPageComponent {

}
