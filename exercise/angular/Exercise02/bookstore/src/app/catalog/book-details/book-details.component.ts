import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book';
import { Router } from '@angular/router';

@Component({
  selector: 'book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  @Input()
  public book: Book;
  @Output()
  public back = new EventEmitter();

  constructor(private router: Router) {}

  public orderBook(): void {
    this.router.navigateByUrl('/customer-details');
  }
}
