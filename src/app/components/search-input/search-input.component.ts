import { Component, output, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  imports: [FormsModule]
})
export default class SearchInputComponent {
  public searchValue = signal('')
  public search = output<string>()

  public onSearch() {
    this.search.emit(this.searchValue())
  }
}
