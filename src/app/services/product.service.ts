import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from "rxjs"

import { api } from "constants/api"
import { ENVIROMENT } from "@environments/enviroment"
import { ProductPayload, ProductResponse } from "@typing/product"

@Injectable({
    providedIn: 'root',
})
export default class ProductServices {
    private product: BehaviorSubject<ProductResponse> = new BehaviorSubject<ProductResponse>({} as ProductResponse)

    public product$: Observable<ProductResponse> = this.product.asObservable()

    constructor(private http: HttpClient) {}

    public getProduct = (id: number | string): Observable<ProductResponse> => {
        const URL = `${ENVIROMENT.apiUrl}/${api.PRODUCT}/${id}`

        return this.http.get<ProductResponse>(URL)
            .pipe(tap(response => this.product.next(response)))
    }

    public editProduct(product: ProductPayload): Observable<ProductResponse> {
        const random = Math.round(Math.random())

        const mockRequest$ = random === 1 
            ? of('Success!')
            : throwError(() => new Error('Failure!'))
        
        return mockRequest$.pipe(
            tap((response: any) => {
                return response
            }),
            catchError(error => {
                return throwError(() => error)
            })
        )
    }
}
