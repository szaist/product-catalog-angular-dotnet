import { Routes } from '@angular/router';
import { AddProductPageComponent } from "./Pages/add-product-page/add-product-page.component";
import { ListProductPageComponent } from "./Pages/list-product-page/list-product-page.component";
import { EditProductPageComponent } from "./Pages/edit-product-page/edit-product-page.component";

export const routes: Routes = [
  { path: '', component: ListProductPageComponent },
  { path: "products/add", component: AddProductPageComponent },
  { path: "products/:productId", component: EditProductPageComponent },
];
