import { Book } from './catalog/book';
import { Customer } from './customer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  public book:Book;
  public customer:Customer;
  constructor(){

  }
}
