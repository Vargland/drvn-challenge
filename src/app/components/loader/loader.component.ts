import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

import { LoaderService } from '@utils';

@Component({
    selector: 'app-loader',
    standalone: true,
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.scss',
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.ShadowDom
})
export default class LoaderComponent {
    constructor(public loader: LoaderService) { }
}
