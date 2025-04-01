import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FilterProduct, ProductResponse, PRODUCTS_FILTER } from '@typing/products';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ProductsServices } from '@services';
import { PaginatorComponent, SearchInputComponent } from '@components';

const FILTERS: FilterProduct = {
  limit: PRODUCTS_FILTER.LIMIT,
  order: PRODUCTS_FILTER.SORT,
  search: PRODUCTS_FILTER.EMPTY,
  skip: PRODUCTS_FILTER.SKIP,
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, SearchInputComponent],
  providers: [ProductsServices],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export default class ProductsComponent implements OnInit {
  constructor(private productsServices: ProductsServices) { }

  private filters = FILTERS

  public limit: number = 10
  public products$!: Observable<ProductResponse>
  public totalItems: number = 0
  public currentPage: number = 0

  public ngOnInit(): void {
    this.getProductBy(FILTERS)

    this.products$ = this.productsServices.product$
  }

  public onChangePage(page: number): void {
    this.currentPage = page;

    this.filters = {
      ...this.filters,
      skip: `${page * this.limit}`,
    }

    this.getProductBy(this.filters)
  }

  public onChangeSearch(searchValue: string) {
    this.filters = {
      ...this.filters,
      skip: '0',
      search: searchValue
    }
    console.log(searchValue)
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

  private getProductBy(filters: FilterProduct) {
    this.productsServices.getBy(filters)
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
