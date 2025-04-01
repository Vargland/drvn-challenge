import { Routes } from '@angular/router';
import { paths } from '@constants/paths';
import { HomeComponent, ProductComponent, ProductsComponent } from '@pages';

export const routes: Routes = [
    { path: paths.ROOT, component: HomeComponent },
    { path: paths.PRODUCT, component: ProductComponent },
    { path: paths.PRODUCTS, component: ProductsComponent },
];
