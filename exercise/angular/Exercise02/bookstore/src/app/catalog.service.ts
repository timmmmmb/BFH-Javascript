import { Injectable } from '@angular/core';
import {BOOK_DATA} from './catalog/book-data'
import { Book} from './catalog/book';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CatalogService {
  public searchBooks(keywords: string): Promise<Book[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var data:Book[] = BOOK_DATA.filter(book=> book.toString().toLowerCase().search(keywords.toLowerCase())!=-1);
        if(data.length > 0){
          resolve(data);
        }else{
          reject('No Result');
        }
      }, 5000);
    });
  }
}
