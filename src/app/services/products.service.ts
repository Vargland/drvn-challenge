import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { api } from "constants/api";
import { ENVIROMENT } from "@environments/enviroment";
import { FilterProducts, ProductsResponse } from "@typing/products";
import { queryBuilder } from "@utils";

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

    public getByFilter = (filter: FilterProducts): Observable<ProductsResponse> => {
        const apiUrl = filter.search ? `${ENVIROMENT.apiUrl}/${api.PRODUCTS}/${api.SEARCH}` : `${ENVIROMENT.apiUrl}/${api.PRODUCTS}`
        
        const URL = queryBuilder(apiUrl, filter)

        return this.http.get<ProductsResponse>(URL)
            .pipe(tap(response => this.products.next(response)))
    }

    public getByCategory = (category: string, filter: FilterProducts): Observable<ProductsResponse> => {
        const apiUrl = `${ENVIROMENT.apiUrl}/${api.PRODUCTS}/${api.CATEGORY}/${category}`

        const URL = queryBuilder(apiUrl, filter)

        return this.http.get<ProductsResponse>(URL)
            .pipe(tap(response => this.products.next(response)))
    }
}
