import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FilterProducts, ProductsResponse, PRODUCTS_FILTER } from '@typing/products';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ProductsServices } from '@services';
import { PaginatorComponent, SearchInputComponent } from '@components';
import { ProductCardComponent } from '@containers';
import { Router } from '@angular/router';
import { paths } from '@constants/paths';

const FILTERS: FilterProducts = {
  limit: PRODUCTS_FILTER.LIMIT,
  order: PRODUCTS_FILTER.SORT,
  search: PRODUCTS_FILTER.EMPTY,
  skip: PRODUCTS_FILTER.SKIP,
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, SearchInputComponent, ProductCardComponent],
  providers: [ProductsServices],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export default class ProductsComponent implements OnInit {
  constructor(
    private productsServices: ProductsServices,
    private router: Router,
  ) { }

  public currentPage: number = 0
  public limit: number = 10
  public products$!: Observable<ProductsResponse>
  public totalItems: number = 0

  private filters = FILTERS

  public ngOnInit(): void {
    this.getProductBy(FILTERS)

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

  private getProductBy(filters: FilterProducts) {
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
