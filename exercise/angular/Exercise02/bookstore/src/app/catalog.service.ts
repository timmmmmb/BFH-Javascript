import { Injectable } from '@angular/core';
import {BOOK_DATA} from './catalog/book-data'
import { Book} from './catalog/book';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private httpClient: HttpClient) {}
  public searchBooks(keywords: string): Promise<Book[]> {
    let url = "http://distsys.ch:1450/api/books";
    let options = { params: new HttpParams().set('keywords', keywords) };
    return this.httpClient.get<Book[]>(url, options).toPromise();
  }
}
