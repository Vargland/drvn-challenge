import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FilterProduct, ProductResponse, PRODUCTS_FILTER } from '@typing/products';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ProductsServices } from '@services';
import { PaginatorComponent } from '@components';

const FILTERS: FilterProduct = {
  limit: PRODUCTS_FILTER.LIMIT,
  order: PRODUCTS_FILTER.SORT,
  search: PRODUCTS_FILTER.EMPTY,
  skip: PRODUCTS_FILTER.SKIP,
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, PaginatorComponent],
  providers: [ProductsServices],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export default class ProductsComponent implements OnInit {
  constructor(private productsServices: ProductsServices) { }

  public limit: number = 10
  public products$!: Observable<ProductResponse>
  public totalItems: number = 0

  public ngOnInit(): void {
    this.getProductBy(FILTERS)

    this.products$ = this.productsServices.product$
  }

  public getCurrentPage(currentPage: number): void {
    this.getProductBy({ skip: currentPage.toString() } as FilterProduct)
  }

  private getProductBy(filter: FilterProduct) {
    const currentFilters = {
      ...FILTERS,
      ...filter
    }

    this.productsServices.getBy(currentFilters)
      .pipe(
        tap((response) => {
          this.limit = response.limit
          this.totalItems = response.total
        })
      ).subscribe()
  }
}
