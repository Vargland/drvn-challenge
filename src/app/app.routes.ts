import { Routes } from '@angular/router'
import { paths } from '@constants/paths'
import { HomeComponent, ProductComponent } from '@pages'

export const routes: Routes = [
    { path: paths.HOME, redirectTo: paths.ROOT },
    { path: paths.ROOT, component: HomeComponent },
    { path: paths.PRODUCT, component: ProductComponent },
]
