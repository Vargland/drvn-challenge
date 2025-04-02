import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FilterProducts, ProductsResponse, PRODUCTS_FILTER } from '@typing/products';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { CategoryServices, ProductsServices } from '@services';
import { PaginatorComponent, SearchInputComponent, SidebarComponent } from '@components';
import { ProductCardComponent } from '@containers';
import { Router } from '@angular/router';
import { paths } from '@constants/paths';
import { Category } from '@typing/category';

const FILTERS: FilterProducts = {
    category: Category.DEFAULT,
    limit: PRODUCTS_FILTER.LIMIT,
    order: PRODUCTS_FILTER.SORT,
    search: PRODUCTS_FILTER.EMPTY,
    skip: PRODUCTS_FILTER.SKIP,
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        PaginatorComponent,
        SearchInputComponent,
        ProductCardComponent,
        SidebarComponent
    ],
    providers: [CategoryServices, ProductsServices],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export default class HomeComponent implements OnInit {
    constructor(
        private categoryServices: CategoryServices,
        private productsServices: ProductsServices,
        private router: Router,
    ) { }

    public products$!: Observable<ProductsResponse>
    public categories$!: Observable<string[]>

    public currentPage: number = 0
    public limit: number = 10
    public totalItems: number = 0

    private filters = FILTERS

    public ngOnInit(): void {
        this.categoryServices.getCategoryList().subscribe()
        this.getProductBy(FILTERS)

        this.categories$ = this.categoryServices.categoryList$
        this.products$ = this.productsServices.products$
    }

    public onChangePage(page: number): void {
        this.currentPage = page;

        this.filters = {
            ...this.filters,
            skip: `${page * this.limit}`,
        }

        this.getProductBy(this.filters)
    }

    public onChangeSearch(searchValue: string): void {
        this.filters = {
            ...this.filters,
            skip: '0',
            search: searchValue
        }

        this.getProductBy(this.filters)
    }

    public onChangePageSize(size: number): void {
        this.filters = {
            ...this.filters,
            skip: '0',
            limit: size.toString(),
        }

        this.currentPage = 0

        this.getProductBy(this.filters)
    }

    public navigateTo(id: number): void {
        this.router.navigate([paths.PRODUCT], { queryParams: { id } })
    }

    public handleClickCategory(category: string): void {
        this.filters = {
            ...FILTERS,
            category
        }

        this.getProductBy(this.filters)

    }

    private getProductBy(filters: FilterProducts): void {
        if (filters.category !== Category.DEFAULT) {
            this.productsServices.getByCategory(filters.category, filters)
                .pipe(
                    tap((response) => {
                        if (this.limit !== Number(this.filters.limit)) {
                            this.limit = response.limit
                        }

                        this.totalItems = response.total
                    })
                ).subscribe()
        } else {
            this.productsServices.getByFilter(filters)
                .pipe(
                    tap((response) => {
                        if (this.limit !== Number(this.filters.limit)) {
                            this.limit = response.limit
                        }

                        this.totalItems = response.total
                    })
                ).subscribe()
        }


    }
}
