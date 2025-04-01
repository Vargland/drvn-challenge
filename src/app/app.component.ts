import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '@components';
import { CurrencySelectorComponent } from '@containers';
import { CurrencyService } from '@utils';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CurrencySelectorComponent, LoaderComponent, RouterOutlet],
    providers: [CurrencyService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent { 
    constructor() { }

}
