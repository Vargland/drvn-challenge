import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export default class PaginatorComponent {
  public currentPage = input(0);
  public itemsPerPage = input(10);
  public pageSizeOptions = input(0);
  public totalItems = input(0);
  public selectedPageSize = this.itemsPerPage();
  public availablePageSizes = [10, 25, 50, 100];

  public pageChanged$ = output<number>();
  public pageChangedSize$ = output<number>();

  public totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage()));
  public startItem = computed(() => (this.currentPage() * this.itemsPerPage()) + 1);
  
  public endItem = computed(() => Math.min(
    (this.currentPage() + 1) * this.itemsPerPage(),
    this.totalItems()
  ));

  public visiblePages = computed(() => {
    const pages: number[] = [];
    const total = this.totalPages();
    const current = this.currentPage() + 1;
    const maxVisible = this.pageSizeOptions();
    
    let start = Math.max(1, current - Math.floor(maxVisible / this.selectedPageSize));
    let end = Math.min(total, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    
    return pages;
  });

  public setPage(page: number): void {
    if (page >= 0 && page < this.totalPages()) {
      this.pageChanged$.emit(page);
    }
  }

  onPageSizeChange(): void {
    this.pageChangedSize$.emit(this.selectedPageSize);
  }
}
