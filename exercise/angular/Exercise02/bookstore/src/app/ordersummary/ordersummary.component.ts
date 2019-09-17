import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Book } from '../catalog/book';
import { Customer } from '../customer';
import { Router } from '@angular/router';

@Component({
  selector: 'ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css']
})
export class OrdersummaryComponent {

  book:Book;
  customer:Customer;
  constructor(public orderService: OrderService, private router: Router) { 
    this.book = orderService.book;
    this.customer = orderService.customer;
  }

}
