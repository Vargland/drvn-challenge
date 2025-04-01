import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Currency } from '@typing/currency';
import { CurrencyService } from '@utils';

@Component({
    selector: 'app-currency-selector',
    imports: [CommonModule, FormsModule],
    templateUrl: './currency-selector.component.html',
    styleUrl: './currency-selector.component.scss'
})

export default class CurrencySelectorComponent {
    constructor(private currencyService: CurrencyService) { }

    public eur = Currency.EUR
    public selectedCurrency: Currency.USD | Currency.EUR = Currency.USD;
    public usd = Currency.USD

    public ngOnInit(): void {
        this.currencyService.currency$.subscribe(currency => {
            this.selectedCurrency = currency;
        });
    }

    public onCurrencyChange(): void {
        this.currencyService.setCurrency(this.selectedCurrency);
    }
}
