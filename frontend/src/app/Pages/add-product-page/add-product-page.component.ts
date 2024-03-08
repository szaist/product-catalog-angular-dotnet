import {Component} from '@angular/core';
import {ProductAddComponent} from "../../Components/product-add/product-add.component";

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [
    ProductAddComponent
  ],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.css'
})
export class AddProductPageComponent {

}
