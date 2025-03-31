import { Routes } from '@angular/router';
import { paths } from '@constants/paths';
import { HomeComponent, ProductsComponent } from '@pages';

export const routes: Routes = [
    { path: paths.ROOT, component: HomeComponent },
    { path: paths.PRODUCTS, component: ProductsComponent },
];
