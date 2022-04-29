import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  options: string[] = [];

  addSuggestion(value: string) {
    if(!this.options.includes(value) && value) {
      this.options.push(value);
    }
  }
}
