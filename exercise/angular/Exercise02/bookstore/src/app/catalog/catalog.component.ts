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
  public keywords:string;
  constructor() {
    this.books = BOOK_DATA;
    Book.prototype.toString = function toString() {
      var ret = this.isbn+" "+this.description+" "+this.title+" "+this.authors+" "+this.publisher;
      return ret;
    }
  }

  public selectBook(book:Book){
    this.selectedBook = book;
  }

  public searchBooks(book:Book){
    return book.toString().toLowerCase().search(this.keywords.toLowerCase())!=-1;
  }

  public filterBooks(){
    this.books = BOOK_DATA.filter(book=>this.searchBooks(book));
  }
}
