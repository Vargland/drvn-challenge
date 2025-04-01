import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { api } from "constants/api";
import { ENVIROMENT } from "@environments/enviroment";
import { ProductQueryParams, ProductResponse } from "@typing/products";

const buildProductsQueryParams = (url: string, filters: ProductQueryParams): string => {
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
export class ProductsServices {
    private product: BehaviorSubject<ProductResponse> = new BehaviorSubject<ProductResponse>({} as ProductResponse)

    public product$: Observable<ProductResponse> = this.product.asObservable()

    constructor(private http: HttpClient) {}

    public getAll = (): Observable<ProductResponse> => {
        return this.http.get<ProductResponse>(`${ENVIROMENT.apiUrl}/${api.PRODUCTS}`)
            .pipe(tap(response => this.product.next(response)))
    }

    public getBy = (params: ProductQueryParams): Observable<ProductResponse> => {
        const apiUrl = params.search ? `${ENVIROMENT.apiUrl}/${api.PRODUCTS}/${api.SEARCH}` : `${ENVIROMENT.apiUrl}/${api.PRODUCTS}`

        const URL = buildProductsQueryParams(apiUrl, params)

        return this.http.get<ProductResponse>(URL)
            .pipe(tap(response => this.product.next(response)))
    }
}

