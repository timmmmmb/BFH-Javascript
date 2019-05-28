import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book';
import { Router } from '@angular/router';
import { CatalogService } from 'src/app/catalog.service';
import { OrderService } from 'src/app/order.service';

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

  constructor(private router: Router, public orderService: OrderService) {}

  public orderBook(): void {
    this.orderService.book = this.book;
    this.router.navigateByUrl('/customer-details');
  }
}
