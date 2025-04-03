import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CurrencySelectorComponent } from '@containers';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, CurrencySelectorComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export default class NavbarComponent {
    constructor() {}
}
