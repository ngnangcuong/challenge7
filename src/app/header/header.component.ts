import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, startWith, map, of } from 'rxjs';
import { PostService } from '../services/post.service';
import { SearchService } from '../services/search.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  surName: string = '';
  public email: string = '';
  constructor(private fb: FormBuilder,
             private searchService: SearchService,
             private userService: UserService,
             private postService: PostService,
             private router: Router) { }

  ngOnInit(): void {
    this.userService.getMe().subscribe(user => {
      this.email = user.email;
    })
    this.filteredOptions = this.searchBox.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
  }
  
  searchKeyword: string = '';
  options: string[] = [];
  
  filteredOptions: Observable<string[]> = of();

  searchBox = new FormControl();
  
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
  
  logout() {
    this.userService.logout();
    this.router.navigateByUrl("/login");
  }

}
