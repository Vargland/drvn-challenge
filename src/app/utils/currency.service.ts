// src/app/services/currency.service.ts
import { Injectable } from '@angular/core'
import { CONVERSION_RATE, Currency, CURRENCY_SYMBOL } from '@typing/currency'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export default class CurrencyService {
    private conversionRates = CONVERSION_RATE
    private currentCurrency = new BehaviorSubject<Currency>(Currency.USD)

    public currency$: Observable<Currency> = this.currentCurrency.asObservable()

    constructor() {
        if (localStorage.getItem("currency") === '' || localStorage.getItem("currency") === null) {
            localStorage.setItem("currency", Currency.USD)
        }
     }

    public getCurrency(): Currency {
        return localStorage.getItem("currency") as Currency
    }

    public setCurrency(currency: Currency): void {
        localStorage.setItem("currency", currency)

        this.currentCurrency.next(currency)
    }

    public convertToSelected(amount: number, fromCurrency: Currency): number {
        if (fromCurrency === this.currentCurrency.value) return amount

        return amount * this.conversionRates[fromCurrency]
    }

    public getCurrentRate(): number {
        return this.conversionRates[this.currentCurrency.value]
    }

    public getCurrencySymbol(): string {
        return localStorage.getItem("currency") === Currency.USD ? CURRENCY_SYMBOL.USD : CURRENCY_SYMBOL.EUR
    }
}
