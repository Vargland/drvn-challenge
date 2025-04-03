import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CurrencySelectorComponent } from '@containers';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, CurrencySelectorComponent],
  providers: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export default class NavbarComponent {
    constructor() { }
}
