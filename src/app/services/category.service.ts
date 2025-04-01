import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { api } from "constants/api";
import { ENVIROMENT } from "@environments/enviroment";

@Injectable({
    providedIn: 'root',
})
export default class CategoryServices {
    private categoryList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([] as string[])

    public categoryList$: Observable<string[]> = this.categoryList.asObservable()

    constructor(private http: HttpClient) {}

    public getCategoryList = (): Observable<string[]> => {
        const URL = `${ENVIROMENT.apiUrl}/${api.PRODUCT}/${api.CATEGORY_LIST}`

        return this.http.get<string[]>(URL)
            .pipe(tap(response => this.categoryList.next(response)))
    }
}
