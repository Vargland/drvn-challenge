import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export default class PaginatorComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() totalItems!: number
  @Input() limit!: number

  public currentPage = 0

  public totalPages = Array.from({ length: 0 })

  @Output() currentPage$ = new EventEmitter<number>()

  get isLastPage(): boolean {
    const lastPage = Math.max(this.totalPages.length - 1)

    return this.currentPage === lastPage
  }

  public ngOnInit(): void {
    this.totalPages = Array.from({ length: Math.ceil(this.totalItems / this.limit) })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] && changes['limit']) {
      this.totalPages = Array.from({ length: Math.ceil(changes['totalItems'].currentValue / changes['limit'].currentValue) })
    }
  }

  public previousPage() {
    this.currentPage--

    this.currentPage$.emit(this.currentPage * this.limit)
  }

  public nextPage() {
    this.currentPage++

    this.currentPage$.emit(this.currentPage * this.limit)
  }
}
