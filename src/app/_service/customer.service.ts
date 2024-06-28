import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Customer } from '../_model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  Getall() {
    return this.http.get<Customer[]>(this.baseUrl + 'Customer');
  }

  GetbyId(id: number) {
    return this.http.get<Customer>(this.baseUrl + `Customer/${id}`);
  }

  Createcustomer(_data: Customer) {
    return this.http.post(this.baseUrl + 'Customer', _data);
  }

  Updatecustomer(id: number, _data: Customer) {
    return this.http.put(this.baseUrl + `Customer/${id}`, _data);
  }

  Deletecustomer(id: number) {
    return this.http.delete(this.baseUrl + `Customer/${id}`);
  }
}
