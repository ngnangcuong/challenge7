import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, startWith, map, of } from 'rxjs';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private fb: FormBuilder, private searchService: SearchService) { }

  ngOnInit(): void {
    this.filteredOptions = this.searchForm.get('searchBox')!.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
  }
  
  options: string[] = [];
  
  filteredOptions: Observable<string[]> = of();
  
  searchForm = this.fb.group({
    'searchBox': new FormControl(),
  })
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option!.toLowerCase().includes(filterValue));
  }
  
  public addSuggestion(value: string) {
    if(value) {
      this.searchService.addSuggestion(value);
      this.options = this.searchService.options;

    }
  } 

}
