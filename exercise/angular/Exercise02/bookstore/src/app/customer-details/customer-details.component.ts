import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Customer, CreditCardType } from '../customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  public customer:Customer = new Customer;
  public creditCardTypes:CreditCardType[] = [CreditCardType.MASTERCARD,CreditCardType.VISA];
  public currentYear:number = (new Date()).getFullYear();

  constructor(public orderService: OrderService) { }

  public saveCustomer(){
    this.orderService.customer = this.customer;
  }
}
