import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { api } from "constants/api";
import { ENVIROMENT } from "@environments/enviroment";
import { ProductsQueryParams, ProductsResponse } from "@typing/products";

const buildProductsQueryParams = (url: string, filters: ProductsQueryParams): string => {
    const newUrl = new URL(url)

    newUrl.searchParams?.append('q', filters.search)
    newUrl.searchParams?.append('limit', filters.limit)
    newUrl.searchParams?.append('order', filters.order)
    newUrl.searchParams?.append('skip', filters.skip)
    
    return newUrl.href as unknown as string
}

@Injectable({
    providedIn: 'root',
})
export default class ProductsServices {
    private products: BehaviorSubject<ProductsResponse> = new BehaviorSubject<ProductsResponse>({} as ProductsResponse)

    public products$: Observable<ProductsResponse> = this.products.asObservable()

    constructor(private http: HttpClient) {}

    public getAll = (): Observable<ProductsResponse> => {
        return this.http.get<ProductsResponse>(`${ENVIROMENT.apiUrl}/${api.PRODUCTS}`)
            .pipe(tap(response => this.products.next(response)))
    }

    public getByFilter = (filter: ProductsQueryParams): Observable<ProductsResponse> => {
        const apiUrl = filter.search ? `${ENVIROMENT.apiUrl}/${api.PRODUCTS}/${api.SEARCH}` : `${ENVIROMENT.apiUrl}/${api.PRODUCTS}`

        const URL = buildProductsQueryParams(apiUrl, filter)

        return this.http.get<ProductsResponse>(URL)
            .pipe(tap(response => this.products.next(response)))
    }

    public getByCategory = (category: string): Observable<ProductsResponse> => {
        const URL = `${ENVIROMENT.apiUrl}/${api.PRODUCTS}/${api.CATEGORY}/${category}`

        return this.http.get<ProductsResponse>(URL)
            .pipe(tap(response => this.products.next(response)))
    }
}
