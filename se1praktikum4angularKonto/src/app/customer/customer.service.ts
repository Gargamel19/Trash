import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerService {

  private apiUrl = 'http://localhost:8080/customers';

  constructor(private http: Http) {
  }

  findAll(): Observable<Customer[]>  {
    return this.http.get(this.apiUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  findById(id: number): Observable<Customer> {
    return this.http.get(this.apiUrl + '/' + id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post(this.apiUrl, customer)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  deleteCustomerById(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/' + id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put(this.apiUrl, customer)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
