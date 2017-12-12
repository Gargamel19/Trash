import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {

  private customers: Customer[];

  constructor(private router: Router,
              private customerService: CustomerService) {
  }

  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.findAll().subscribe(
      customers => {
        this.customers = customers;
        console.log('huhu getAllCustomers');
      },
      err => {
        console.log(err);
      }

    );
  }

  redirectNewCustomerPage() {
    this.router.navigate(['/customer/create']);
  }

  editCustomerPage(customer: Customer) {
    if (customer) {
      this.router.navigate(['/customer/edit', customer.id]);
    }
  }

  deleteCustomer(customer: Customer) {
    if (customer) {
      this.customerService.deleteCustomerById(customer.id).subscribe(
        res => {
          this.getAllCustomers();
          this.router.navigate(['/customer']);
          console.log('done');
        }
      );
    }
  }

}
