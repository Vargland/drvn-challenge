import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

@Component({
    selector: 'app-product-details',
    imports: [CommonModule],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export default class ProductDetailsComponent {
    public brand = input<string>('');
    public description = input<string | null>(null);
    public images = input<string[] | null>(null);
    public title = input<string>('');
    public noImage: string = 'assets/images/noimage.png'
    public price = input<number>(0);
    public stock = input<number>(0)
    public tags = input<string[] | null>([])
    public warrantyInformation = input<string | null>(null);
    public weight = input<number | null>(null);
}
