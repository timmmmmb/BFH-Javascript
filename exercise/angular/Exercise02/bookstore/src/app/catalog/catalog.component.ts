import { Component } from '@angular/core';
import { Book} from './book';
import {CatalogService} from '../catalog.service';

@Component({
  selector: 'bookcatalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  public books:Book[];
  public loading:boolean;
  public selectedBook:Book;
  public keywords:string;
  constructor(private catalogService: CatalogService) {
    this.books = [];
  }

  public selectBook(book:Book){
    this.selectedBook = book;
  }

  public searchBooks(){
    this.books = [];
    this.loading = true;
    this.catalogService.searchBooks(this.keywords)
      .then(result => {
        this.books = result;
        this.loading = false;}
      )
      .catch(error => {
        console.log(error);
        this.loading = false;
      })
  }
}
