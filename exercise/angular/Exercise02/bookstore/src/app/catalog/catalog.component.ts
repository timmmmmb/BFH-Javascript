import { Component, OnInit } from '@angular/core';
import {BOOK_DATA} from './book-data'
import { Book, BookBinding } from './book';

@Component({
  selector: 'bookcatalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  public books:Book[];
  public selectedBook:Book;
  constructor() {
    this.books = BOOK_DATA;
  }

  public selectBook(book:Book){
    this.selectedBook = book;
  }
}
