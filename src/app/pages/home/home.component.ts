import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SidebarComponent } from '@components';
import { CategoryServices, ProductsServices } from '@services';
import { ProductsResponse } from '@typing/products';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    imports: [CommonModule, SidebarComponent],
    providers: [CategoryServices, ProductsServices],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export default class HomeComponent implements OnInit {
    constructor(
        private categoryServices: CategoryServices,
        private productsServices: ProductsServices,
    ) { }

    public categories$!: Observable<string[]>

    public products$!: Observable<ProductsResponse>

    public ngOnInit(): void {
        this.categoryServices.getCategoryList().subscribe()

        this.categories$ = this.categoryServices.categoryList$
    }

    public handleClickCategory(category: string) {
        this.productsServices.getByCategory(category).subscribe()
    }
}
