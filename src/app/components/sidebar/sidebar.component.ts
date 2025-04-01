import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    imports: [],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})

export default class SidebarComponent {
  public items = input<string[]>();
  public title = input<string>();

  public onClickItem = output<string>();

  public onHandleClick(item: string) {
    this.onClickItem.emit(item);
  }
}
