import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { api } from "constants/api";
import { ENVIROMENT } from "@environments/enviroment";
import { ProductResponse } from "@typing/product";

@Injectable({
    providedIn: 'root',
})
export default class ProductServices {
    private product: BehaviorSubject<ProductResponse> = new BehaviorSubject<ProductResponse>({} as ProductResponse)

    public product$: Observable<ProductResponse> = this.product.asObservable()

    constructor(private http: HttpClient) {}

    public get = (id: number | string): Observable<ProductResponse> => {
        const URL = `${ENVIROMENT.apiUrl}/${api.PRODUCT}/${id}`

        return this.http.get<ProductResponse>(URL)
            .pipe(tap(response => this.product.next(response)))
    }
}
