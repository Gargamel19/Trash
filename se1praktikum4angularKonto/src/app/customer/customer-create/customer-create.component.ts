import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../customer.service';
import {Customer} from '../Customer';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
  providers: [CustomerService]
})
export class CustomerCreateComponent implements OnInit, OnDestroy {

  id: number;
  customer: Customer;

  customerForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.customerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ])
    });

    if (this.id) { //edit form
      this.customerService.findById(this.id).subscribe(
        customer => {
          this.id = customer.id;
          this.customerForm.patchValue({
            name: customer.name,
            email: customer.email.email,
          });
        }, error => {
          console.log(error);
        }
      );

    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  navigateBack(): void {
    this.customerForm.reset();
    this.router.navigate(['/customer']);
  }

  onSubmit() {
    if (this.customerForm.valid) {

      if (this.id) {
        const customer: Customer = new Customer(this.id,
          this.customerForm.controls['name'].value,
          this.customerForm.controls['email'].value);
        this.customerService.updateCustomer(customer).subscribe(() => { this.navigateBack(); });
      } else {
        const customer: Customer = new Customer(null,
          this.customerForm.controls['name'].value,
          this.customerForm.controls['email'].value);
        this.customerService.saveCustomer(customer).subscribe(() => { this.navigateBack(); });
      }

    }
  }

  redirectCustomerPage() {
    this.router.navigate(['/customer']);
  }

}
