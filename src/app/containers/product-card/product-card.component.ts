import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-product-card',
    imports: [CommonModule],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss'
})

export default class ProductCardComponent {
    public brand = input<string>('');
    public id = input.required<number>();
    public name = input<string>('');
    public price = input<number>(0);
    public rating = input<number | null>(null);
    public stock = input<number>(0)
    public thumbnailSrc = input<string | null>(null);
    public noImage: string = 'assets/images/noimage.png'
    
    public productClicked = output<number>();

    public handleImageError(event: Event): void {
        const imgElement = event.target as HTMLImageElement;
        imgElement.src = this.noImage
    }

    public onClickProduct(): void {
        this.productClicked.emit(this.id());
    }

    public getStockStatusClass(): string {
        const stockLevel = this.stock()

        if (stockLevel === 0) return 'product-card__name--out-of-stock'
        if (stockLevel < 50) return 'product-card__name--low-stock'

        return 'product-card__name--in-stock'
    }
}
