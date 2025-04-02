import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductPayload, ProductResponse } from '@typing/product';

import { CurrencyFormatPipe, CurrencyService } from '@utils';

@Component({
    selector: 'app-product-details',
    imports: [CommonModule, CurrencyFormatPipe, FormsModule],
    providers: [CurrencyService],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export default class ProductDetailsComponent implements OnInit {
    public editableProduct = signal<ProductPayload>(this.getEmptyProduct());
    public isEditMode = signal<boolean>(false);

    public product = input.required<ProductResponse>()

    public save = output<ProductPayload>()
    public cancel = output<void>()

    public ngOnInit(): void {
        this.editableProduct.set(this.product())
    }

    public toggleEditMode() {
        this.isEditMode.update(mode => !mode)

        if (this.isEditMode()) {
            this.editableProduct.set(this.extractEditableFields(this.product()));
        }
    }

    public onSubmit() {
        this.save.emit(this.editableProduct());
        this.isEditMode.set(false)
    }

    public onCancel() {
        this.isEditMode.set(false);
        this.cancel.emit();
    }

    private extractEditableFields(product: ProductResponse): ProductPayload {
        return {
            description: product.description,
            price: product.price,
            stock: product.stock,
            title: product.title,
        };
    }

    private getEmptyProduct(): Product {
        return {
            brand: '',
            description: '',
            images: [],
            price: 0,
            stock: 0,
            title: '',
            tags: [],
            warrantyInformation: '',
            weight: 0
        };
    }


}
