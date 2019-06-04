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
    /*new Promise((resolve, reject) => {
      setTimeout(() => {
        if(keywords != undefined){
          var data:Book[] = BOOK_DATA.filter(book=> book.toString().toLowerCase().search(keywords.toLowerCase())!=-1);
          if(data.length > 0){
            resolve(data);
          } else{
            reject('No Result');
          }
        } else{
          resolve(BOOK_DATA);
        }
        
      }, 500);
    });*/
  }
}
