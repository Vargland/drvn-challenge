import { Pipe, PipeTransform } from '@angular/core';
import CurrencyService from './currency.service';

@Pipe({
  name: 'currency',
  standalone: true,
  pure: false
})

export default class CurrencyFormatPipe implements PipeTransform {
  constructor(private currencyService: CurrencyService) {}

  public transform(price: number): string {
    const converted = this.currencyService.convertToSelected(price, this.currencyService.getCurrency())
    const symbol = this.currencyService.getCurrencySymbol()

    return `${symbol} ${converted.toFixed(2)}`
  }
}
