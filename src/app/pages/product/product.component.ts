import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ProductServices } from '@services';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductDetailsComponent } from '@containers';
import { ProductPayload, ProductResponse } from '@typing/product';

@Component({
    selector: 'app-product',
    imports: [CommonModule, ProductDetailsComponent, FormsModule],
    providers: [ProductServices],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export default class ProductComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private productServices: ProductServices
    ) { }
    public product$!: Observable<ProductResponse>

    public ngOnInit(): void {
        this.activatedRoute.queryParams
            .pipe(
                switchMap((params) => this.productServices.getProduct(params['id']))
            ).subscribe();

        this.product$ = this.productServices.product$
    }

    public onProductSave(product: ProductPayload) {
        console.log(product)
    }

    public onEditCancel() {
        console.log(this.product$.subscribe())
    }
}
