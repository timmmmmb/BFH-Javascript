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

  public searchBooks(){
    this.books = [];
    var i = 0;
    for(let book of BOOK_DATA){
      if(book.toString().toLowerCase().search(this.keywords.toLowerCase())!=-1){
        this.books[i] = book;
        i++;
      }
    }
  }
}
