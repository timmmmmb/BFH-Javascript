import { Book } from './catalog/book';
import { Customer } from './customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  public book:Book;
  public customer:Customer;
  constructor(private httpClient: HttpClient) {}
  public orderBook(): Promise<number> {
    let url = "http://distsys.ch:1450/api/orders";
    let options = {
      params: new HttpParams().set('isbn', this.book.isbn),
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.httpClient.post<number>(url, this.customer, options).toPromise().then(result =>{console.log(result);
    return result});
  }
}
